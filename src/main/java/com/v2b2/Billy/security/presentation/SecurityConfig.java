package com.v2b2.Billy.security.presentation;

import com.v2b2.Billy.security.presentation.filter.JwtAuthenticationFilter;
import com.v2b2.Billy.security.presentation.filter.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public final static String LOGIN_PATH = "/login";
    public final static String REGISTER_PATH = "/register";
    public final static String HOME_PATH = "/**";
    public final static String SWAGGER_PATH = "/api-docs";
    public final static String SWAGGER_UI_PATH = "/swagger-ui/**";

    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @Value("${security.jwt.expiration-in-ms}")
    private Integer jwtExpirationInMs;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, HOME_PATH).permitAll()
                .antMatchers(HttpMethod.GET, SWAGGER_PATH).permitAll()
                .antMatchers(HttpMethod.GET, SWAGGER_UI_PATH).permitAll()
                .antMatchers(HttpMethod.POST, REGISTER_PATH).permitAll()
                .antMatchers(HttpMethod.POST, LOGIN_PATH).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(
                        new JwtAuthenticationFilter(
                                LOGIN_PATH,
                                this.jwtSecret,
                                this.jwtExpirationInMs,
                                this.authenticationManager()
                        ),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilter(new JwtAuthorizationFilter(this.jwtSecret, this.authenticationManager()))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
