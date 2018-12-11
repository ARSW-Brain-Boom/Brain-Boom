/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 *
 * @author Brain&Boom Team
 */
@Service("clasico")
public class Clasico implements Juego {

    private Integer idRoom;
    private boolean enJuego;
    private ArrayList<Jugador> jugadores;
    private Tablero tablero;

    public Clasico() {
        this.idRoom = -1;
        this.enJuego = false;
        this.jugadores = new ArrayList<>();
        this.tablero = new Tablero();
    }

    @Override
    public void addPlayer(String name) throws BandBException {
        boolean existe = false;
        for (int i = 0; i < jugadores.size() && !existe; i++) {
            if (name.equals(jugadores.get(i).getNickName())) {
                existe = true;
            }
        }
        if (existe) {
            throw new BandBException("El usuario a agregar ya existe.");
        }
        jugadores.add(new Jugador(name, new Bomba(10, 25)));
    }

    @Override
    public void deletePlayer(String name) throws BandBException {
        boolean existe = false;
        for (int i = 0; i < jugadores.size() && !existe; i++) {
            Jugador jugadorActual = jugadores.get(i);
            if (name.equals(jugadorActual.getNickName())) {
                jugadores.remove(i);
                existe = true;
            }
        }
        if (!existe) {
            throw new BandBException("El usuario a eliminar no existe.");
        }
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
    public ArrayList<Jugador> getJugadores() {
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
