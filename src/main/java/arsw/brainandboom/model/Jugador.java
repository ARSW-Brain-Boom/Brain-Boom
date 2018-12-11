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
    private String color;
    private int posx;
    private int posy;

    public Jugador(String nickName, Bomba bomba, String color, int posx, int posy) {
        this.nickName = nickName;
        this.vida = 100;
        this.numBombas = 1;
        this.bomba = bomba;
        this.color=color;
        this.posx=posx;
        this.posy=posy;
    }
    public int getPosx(){
        return posx;
    }
    public int getPosy(){
        return posy;
    }
    public String getNickName() {
        return nickName;
    }
    
    public String getColor() {
        return color;
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
        return "Jugador{" + "nickName=" + nickName + ", vida=" + vida +  ", color=" + color+ ", numBombas=" + numBombas + ", bomba=" + bomba + '}';
    }

}
