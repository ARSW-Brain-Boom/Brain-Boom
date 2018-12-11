/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.service;

import arsw.brainandboom.model.Bloque;
import arsw.brainandboom.model.Jugador;
import arsw.brainandboom.model.BandBException;
import java.util.ArrayList;

/**
 *
 * @author Brain&Boom Team
 */
public interface BrainAndBoomService {

    /**
     *
     * @param idRoom
     * @throws BandBException
     */
    public void createGame(Integer idRoom) throws BandBException;

    /**
     *
     * @param name
     * @throws BandBException
     */
    public void addPlayer(String name) throws BandBException;

    /**
     *
     * @param name
     * @throws BandBException
     */
    public void deletePlayer(String name) throws BandBException;

    /**
     *
     * @return
     */
    public int getIdRoom();

    /**
     *
     * @return
     */
    public boolean isEnJuego();

    /**
     *
     * @param enJuego
     */
    public void setEnJuego(boolean enJuego);

    /**
     *
     * @return
     */
    public ArrayList<Jugador> getJugadores();

    /**
     *
     * @return
     */
    public ArrayList<Bloque> getListaBloquesTablero();
}
