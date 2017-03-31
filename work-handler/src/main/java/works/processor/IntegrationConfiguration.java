package works.processor;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Configuration;

import works.processor.data.sourcesink.WorkUnitsSink;

@Configuration
@EnableBinding(WorkUnitsSink.class)
public class IntegrationConfiguration {}
