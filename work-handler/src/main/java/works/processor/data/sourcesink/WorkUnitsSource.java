package works.processor.data.sourcesink;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface WorkUnitsSource {

    String CHANNEL_NAME_01 = "worksChannel01";

    @Output
    MessageChannel worksChannel01();
    
    String CHANNEL_NAME_02 = "worksChannel02";

    @Output
    MessageChannel worksChannel02();
}
