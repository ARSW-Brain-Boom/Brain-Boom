/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.restcontroller;

import arsw.brainandboom.model.BandBException;
import arsw.brainandboom.model.Bloque;
import arsw.brainandboom.service.BrainAndBoomService;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Brain&Boom Team
 */
@RestController
@RequestMapping("/bnb")
public class BrainAndBoomController {

    @Autowired
    private BrainAndBoomService bnbs;

    @PostMapping
    public ResponseEntity<?> setIdRoom(@RequestBody Integer idRoom) {
        try {
            //registrar contenido
            //curl -i -X POST -HContent-Type:application/json -HAccept:application/json http://localhost:8080/bnb -d '1'
            System.out.println("Llegó: " + idRoom);
            bnbs.createGame(idRoom);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BandBException ex) {
            Logger.getLogger(Exception.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/blocklist")
    public ResponseEntity<?> getListBlocks() {
        try {
            return new ResponseEntity<>(bnbs.getListaBloquesTablero(), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(Exception.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Primero debe crear un juego." + ex, HttpStatus.NOT_FOUND);
        }
    }

}
