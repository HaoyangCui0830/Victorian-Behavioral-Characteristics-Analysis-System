package com.ccc.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * @description: set cors
 * @author: Xin(Shawn) Wu
 */
@Configuration
public class CorsConfig {

    public CorsConfig() {
    }

    @Bean
    public CorsFilter corsFilter() {
        // 1. add cors config info
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");

        // set cookie sender true
        config.setAllowCredentials(true);

        // set allowed request method
        config.addAllowedMethod("*");

        // set allowed header
        config.addAllowedHeader("*");

        // 2. add url mapping path
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        corsSource.registerCorsConfiguration("/**", config);

        // 3. return corsSource
        return new CorsFilter(corsSource);
    }

}
