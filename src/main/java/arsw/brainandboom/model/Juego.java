/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

import java.util.ArrayList;

/**
 *
 * @author Brain&Boom Team
 */
public interface Juego {

    /**
     *
     * @param name
     * @throws BandBException
     */
    public void addPlayer(String name, String color, int posx, int posy) throws BandBException;

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
    public Integer getIdRoom();

    /**
     *
     * @param idRoom
     */
    public void setIdRoom(Integer idRoom);

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
    public Tablero getTablero();

    /**
     *
     * @param tablero
     */
    public void setTablero(Tablero tablero);
    
    public Jugador getJugador(String color);

}
