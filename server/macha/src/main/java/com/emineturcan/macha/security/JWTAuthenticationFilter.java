package com.emineturcan.macha.security;

import com.auth0.jwt.JWT;
import com.emineturcan.macha.user.ApplicationUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.emineturcan.macha.security.SecurityConstants.EXPIRATION_TIME;
import static com.emineturcan.macha.security.SecurityConstants.SECRET;

/**
 * Filter responsible for authenticating users
 */
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    /*
   attemptAuthentication: where we parse the user's credentials and issue them to the AuthenticationManager
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            ApplicationUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), ApplicationUser.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
/*
successfulAuthentication: which is the method called when a user successfully logs in. We use this method to generate a JWT for this user.
 */
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        //res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        //res.getWriter().write("{ token: " + token + "}");

        JSONObject body = new JSONObject();

        try {
            body.put("token", token);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        res.getWriter().write(body.toString());
        res.addHeader("Content-Type", "application/json");

    }
}