/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author Brain&Boom Team
 */
@Service("clasico")
public class Clasico implements Juego {

    private Integer idRoom;
    private boolean enJuego;
    private Map<String, Jugador> jugadores;
    private Tablero tablero;

    public Clasico() {
        this.idRoom = -1;
        this.enJuego = false;
        this.jugadores = new HashMap<>();
        this.tablero = new Tablero();
    }

    @Override
    public void addPlayer(String name) throws BandBException {
        if (jugadores.containsKey(name)) {
            throw new BandBException("El usuario a agregar ya existe.");
        }
        jugadores.put(name, new Jugador(name, new Bomba(10, 25)));
    }

    @Override
    public void deletePlayer(String name) throws BandBException {
        if (!jugadores.containsKey(name)) {
            throw new BandBException("El usuario a eliminar no existe o ya fue eliminado.");
        }
        jugadores.remove(name);
    }

    @Override
    public Integer getIdRoom() {
        return idRoom;
    }

    @Override
    public void setIdRoom(Integer idRoom) {
        this.idRoom = idRoom;
    }

    @Override
    public boolean isEnJuego() {
        return enJuego;
    }

    @Override
    public void setEnJuego(boolean enJuego) {
        this.enJuego = enJuego;
    }

    @Override
    public Jugador getJugador(String userName) {
        return jugadores.get(userName);
    }

    @Override
    public Map<String, Jugador> getJugadores() {
        return jugadores;
    }

    @Override
    public Tablero getTablero() {
        return tablero;
    }

    @Override
    public void setTablero(Tablero tablero) {
        this.tablero = tablero;
    }

}
