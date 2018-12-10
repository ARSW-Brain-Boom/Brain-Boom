/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.websocketconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Brain&Boom Team
 */
@Controller
public class STOMPMessagesHandler {

    @Autowired
    SimpMessagingTemplate msgt;

    /**
     * Actualizar la posición de los personajes
     *
     * @param numroom
     * @param e
     * @throws Exception
     */
    @MessageMapping("/newposition.{numroom}")
    public synchronized void handlePositionEvent(@DestinationVariable int numroom, String jsonValue) throws Exception {
        System.out.println("Nuevo movimiento recibido en el servidor! Sala número: " + numroom);
        msgt.convertAndSend("/topic/newposition." + numroom, jsonValue);
    }

    /**
     * Actualizar el estado de los personajes
     *
     * @param numroom
     * @param e
     * @throws Exception
     */
    @MessageMapping("/newstate.{numroom}")
    public synchronized void handleStateEvent(@DestinationVariable int numroom, int e) throws Exception {
        System.out.println("Nuevo estado recibido en el servidor! Sala número: " + numroom);
        msgt.convertAndSend("/topic/newstate." + numroom, e);
    }

}
