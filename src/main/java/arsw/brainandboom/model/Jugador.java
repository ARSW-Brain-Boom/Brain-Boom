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

    public Jugador(String nickName, int vida) {
        this.nickName = nickName;
        this.vida = vida;
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

}
