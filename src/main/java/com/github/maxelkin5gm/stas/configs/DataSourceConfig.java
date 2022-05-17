package com.github.maxelkin5gm.stas.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        Properties props = new Properties();
        props.setProperty("foreign_keys", "true");
        return new DriverManagerDataSource("jdbc:sqlite:./sqlite/db.sqlite", props);
    }
}
