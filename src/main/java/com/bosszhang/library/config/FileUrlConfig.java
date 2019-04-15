package com.bosszhang.library.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class FileUrlConfig
  extends WebMvcConfigurerAdapter
{

  @Value("${img.url}")
  private String bookImgUrl;
  @Value("${img.web.url}")
  private String bookImgWebUrl;

  public void addResourceHandlers(ResourceHandlerRegistry registry)
  {
    registry.addResourceHandler(new String[] { this.bookImgWebUrl+ "**" }).addResourceLocations(new String[] { "file:" + this.bookImgUrl});
  }
}
