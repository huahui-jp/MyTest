package works.processor.utils;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.MessageProperties;

public class MessageTools {

	public static Channel prepareSendQueue(String queueName) {
		
		try {
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("127.0.0.1");
			
			Connection conn = factory.newConnection();
			Channel channel = conn.createChannel();
			
			// 持久化消息队列
			channel.queueDeclare(queueName, true, false, false, null);
			
			return channel;
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public static void sendMessage(Channel channel, String topicName, String message) {
		
		try {
			channel.basicPublish("", topicName, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes());
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
}
