/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.service;

import arsw.brainandboom.model.Bloque;
import arsw.brainandboom.model.Juego;
import arsw.brainandboom.model.Jugador;
import arsw.brainandboom.model.BandBException;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Brain&Boom Team
 */
@Service
public class BrainAndBoomServiceImpl implements BrainAndBoomService {

    @Autowired
    @Qualifier("clasico")
    private Juego juego;
    
    public int cont=0;
    public String color;

    @Override
    public void createGame(Integer idRoom) throws BandBException {
        if (juego.getIdRoom() != -1) {
            throw new BandBException("La sala ya existe.");
        }
        juego.setIdRoom(idRoom);
    }

    @Override
    public void addPlayer(String name) throws BandBException {
        int posx=25;
        int posy=25;
        if(cont==0){
            color="red";
        }else if(cont==1){
            posx=750;
            posy=550;
            color="black";
        }else if(cont==2){
            posx=25;
            posy=550;
            color="white";
        }else if(cont==3){
            posx=750;
            posy=25;
            color="purple";
        }
        juego.addPlayer(name,color,posx,posy);
        cont+=1;
    }

    @Override
    public void deletePlayer(String name) throws BandBException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int getIdRoom() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean isEnJuego() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void setEnJuego(boolean enJuego) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ArrayList<Jugador> getJugadores() {
        return juego.getJugadores();
    }

    @Override
    public ArrayList<Bloque> getListaBloquesTablero() {
        return juego.getTablero().getBlocks();
    }

}
