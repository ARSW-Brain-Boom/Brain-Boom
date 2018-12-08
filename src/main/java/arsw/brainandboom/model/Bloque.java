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
public class Bloque {

    private int x;
    private int y;
    private TipoBloque tipo;

    public Bloque(int x, int y, TipoBloque tipo) {
        this.x = x;
        this.y = y;
        this.tipo = tipo;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public TipoBloque getTipo() {
        return tipo;
    }

    public void setTipo(TipoBloque tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Bloque{" + "x=" + x + ", y=" + y + ", tipo=" + tipo + '}';
    }

}
