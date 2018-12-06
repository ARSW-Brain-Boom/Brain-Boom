/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

/**
 *
 * @author Brain&Boom Team
 */
public class Jugador {

    private String nickName;
    private int vida;
    private int numBombas;
    private Bomba bomba;

    public Jugador(String nickName, Bomba bomba) {
        this.nickName = nickName;
        this.vida = 100;
        this.numBombas = 1;
        this.bomba = bomba;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getVida() {
        return vida;
    }

    public void setVida(int vida) {
        this.vida = vida;
    }

    public int getNumBombas() {
        return numBombas;
    }

    public void setNumBombas(int numBombas) {
        this.numBombas = numBombas;
    }

    public Bomba getBomba() {
        return bomba;
    }

    public void setBomba(Bomba bomba) {
        this.bomba = bomba;
    }

    @Override
    public String toString() {
        return "Jugador{" + "nickName=" + nickName + ", vida=" + vida + ", numBombas=" + numBombas + ", bomba=" + bomba + '}';
    }

}
