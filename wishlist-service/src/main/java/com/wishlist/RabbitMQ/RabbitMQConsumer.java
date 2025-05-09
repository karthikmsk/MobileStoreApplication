package com.wishlist.RabbitMQ;

import org.springframework.amqp.rabbit.annotation.RabbitListener;

import com.wishlist.DTO.WishListDTO;

public class RabbitMQConsumer {
    @RabbitListener(queues = "${rabbitmq.queue}") 
    public void receiveMessage(WishListDTO message) {
        System.out.println("Received message: " + message);
    }
}
