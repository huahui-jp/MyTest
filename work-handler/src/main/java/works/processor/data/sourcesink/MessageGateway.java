package works.processor.data.sourcesink;

import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.MessagingGateway;

import works.processor.data.sourcesink.WorkUnitsSource;

@MessagingGateway
public interface MessageGateway {

	@Gateway(requestChannel = WorkUnitsSource.CHANNEL_NAME_01)
	void worksChannel01(String data);
	
	@Gateway(requestChannel = WorkUnitsSource.CHANNEL_NAME_02)
	void worksChannel02(String data);
}
