/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

import java.util.Map;

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
     * @param userName
     * @return
     */
    public Jugador getJugador(String userName);

    /**
     *
     * @return
     */
    public Map<String, Jugador> getJugadores();

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

}
