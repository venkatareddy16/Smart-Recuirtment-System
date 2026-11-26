package com.vcube.smartrecuritmentsystem.securityconfig;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    // 1. Password Encoder Bean (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless REST APIs
            .csrf(csrf -> csrf.disable())

            // Enable CORS to use rules from your WebConfig.java (React on localhost:5173)
            .cors(Customizer.withDefaults())

            // Stateless session: No HTTP sessions, 100% JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Authorization Rules
            .authorizeHttpRequests(auth -> auth
                // A. PUBLIC ENDPOINTS (No Token Needed)
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**",
                    "/v3/api-docs"
                ).permitAll()
                
                // Allow anyone/candidates to browse jobs
                .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()

                // B. RECRUITER ONLY
                .requestMatchers(HttpMethod.POST, "/api/jobs/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.PUT, "/api/jobs/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").hasRole("RECRUITER")
                .requestMatchers("/api/applications/job/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.PUT, "/api/applications/*/status").hasRole("RECRUITER")
                .requestMatchers("/api/analytics/**").hasRole("RECRUITER")

                // C. CANDIDATE ONLY
                .requestMatchers("/api/candidates/**").hasRole("CANDIDATE")
                .requestMatchers("/api/applications/apply/**").hasRole("CANDIDATE")
                .requestMatchers("/api/applications/my-applications").hasRole("CANDIDATE")
                .requestMatchers("/api/ai/**").hasRole("CANDIDATE")

                // D. ANY OTHER ENDPOINT MUST BE AUTHENTICATED
                .anyRequest().authenticated()
            )

            // Add JWT Filter before default authentication filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}