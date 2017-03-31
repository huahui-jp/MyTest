package works.processor.data.sourcesink;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface WorkUnitsSink {
    String CHANNEL_NAME_01 = "worksChannel01";

    String CHANNEL_NAME_02 = "worksChannel02";

    String CHANNEL_NAME_03 = "worksChannel03";

    String CHANNEL_NAME_04 = "worksChannel04";

    String CHANNEL_NAME_05 = "worksChannel05";

    String CHANNEL_NAME_06 = "worksChannel06";

    String CHANNEL_NAME_07 = "worksChannel07";

    String CHANNEL_NAME_08 = "worksChannel08";

    String CHANNEL_NAME_09 = "worksChannel09";

    String CHANNEL_NAME_10 = "worksChannel10";

    String CHANNEL_NAME_11 = "worksChannel11";

    String CHANNEL_NAME_12 = "worksChannel12";

    String CHANNEL_NAME_13 = "worksChannel13";

    String CHANNEL_NAME_14 = "worksChannel14";

    String CHANNEL_NAME_15 = "worksChannel15";

    String CHANNEL_NAME_16 = "worksChannel16";

    String CHANNEL_NAME_17 = "worksChannel17";

    String CHANNEL_NAME_18 = "worksChannel18";
    
    String CHANNEL_NAME_19 = "worksChannel19";

    String CHANNEL_NAME_20 = "worksChannel20";
    
    @Input
    SubscribableChannel worksChannel01();
    
    @Input
    SubscribableChannel worksChannel02();

    @Input
    SubscribableChannel worksChannel03();
    
    @Input
    SubscribableChannel worksChannel04();
    
    @Input
    SubscribableChannel worksChannel05();
    
    @Input
    SubscribableChannel worksChannel06();
    
    @Input
    SubscribableChannel worksChannel07();
    
    @Input
    SubscribableChannel worksChannel08();
    
    @Input
    SubscribableChannel worksChannel09();
    
    @Input
    SubscribableChannel worksChannel10();
    
    @Input
    SubscribableChannel worksChannel11();
    
    @Input
    SubscribableChannel worksChannel12();
    
    @Input
    SubscribableChannel worksChannel13();
    
    @Input
    SubscribableChannel worksChannel14();
    
    @Input
    SubscribableChannel worksChannel15();
    
    @Input
    SubscribableChannel worksChannel16();
    
    @Input
    SubscribableChannel worksChannel17();
    
    @Input
    SubscribableChannel worksChannel18();
    
    @Input
    SubscribableChannel worksChannel19();
    
    @Input
    SubscribableChannel worksChannel20();
}
