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
import java.util.Map;
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

    @Override
    public void createGame(Integer idRoom) throws BandBException {
        if (juego.getIdRoom() != -1) {
            throw new BandBException("La sala ya existe.");
        }
        juego.setIdRoom(idRoom);
    }

    @Override
    public void addPlayer(String name) throws BandBException {
        juego.addPlayer(name);
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
    public Jugador getJugador(String userName) {
        return juego.getJugador(userName);
    }

    @Override
    public Map<String, Jugador> getJugadores() {
        return juego.getJugadores();
    }

    @Override
    public ArrayList<Bloque> getListaBloquesTablero() {
        return juego.getTablero().getBlocks();
    }

}
