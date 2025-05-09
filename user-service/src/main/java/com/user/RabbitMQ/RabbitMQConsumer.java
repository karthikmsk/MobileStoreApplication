package com.user.RabbitMQ;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.user.DTO.UserDTO;

@Service
public class RabbitMQConsumer {

    @RabbitListener(queues = "${rabbitmq.queue}") 
    public void receiveMessage(UserDTO message) {
        System.out.println("Received message: " + message);
    }
}
