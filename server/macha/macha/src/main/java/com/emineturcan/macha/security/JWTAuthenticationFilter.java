package com.emineturcan.macha.security;

import com.auth0.jwt.JWT;
import com.emineturcan.macha.user.ApplicationUser;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static com.emineturcan.macha.security.SecurityConstants.HEADER_STRING;
import static com.emineturcan.macha.security.SecurityConstants.SECRET;
import static com.emineturcan.macha.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		try {
			ApplicationUser creds = new ObjectMapper().readValue(req.getInputStream(), ApplicationUser.class);

			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(),
					creds.getPassword(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
//if token is invalid
    	Date expiration = new Date(System.currentTimeMillis()+ EXPIRATION_TIME);
        String token = Jwts.builder().setSubject(((User)auth.getPrincipal().getUsername())
        		.setExpiration(expiration)
        		.signWith(SignatureAlgorithm.HMAC512,SECRET).compact();
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}
