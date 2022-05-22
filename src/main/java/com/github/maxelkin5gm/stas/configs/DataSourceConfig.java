package com.github.maxelkin5gm.stas.configs;

import com.github.maxelkin5gm.stas.utils.DbHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class DataSourceConfig {

    String PATH_TO_DATABASE = DbHelper.getPathToDatabase();

    @Bean
    public DataSource dataSource() {
        Properties props = new Properties();
        props.setProperty("foreign_keys", "true");
        return new DriverManagerDataSource("jdbc:sqlite:" + PATH_TO_DATABASE, props);
//        return new DriverManagerDataSource("jdbc:sqlite:./sqlite/db.sqlite", props);
    }
}
