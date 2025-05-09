package com.mobilestore.product.RabbitMQ;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.mobilestore.product.DTO.ProductDTO;

@Service
public class RabbitMQConsumer {

    @RabbitListener(queues = "${rabbitmq.queue}") 
    public void receiveMessage(ProductDTO message) {
        System.out.println("Received message: " + message);
    }
}
