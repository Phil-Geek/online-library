package com.bosszhang.library.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

@Configuration
public class FileUploadConfig
{
  @Bean
  public MultipartConfigElement multipartConfigElement()
  {
    MultipartConfigFactory factory = new MultipartConfigFactory();

    factory.setMaxFileSize("5120MB");

    factory.setMaxRequestSize("7168MB");
    return factory.createMultipartConfig();
  }
}
