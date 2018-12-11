/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arsw.brainandboom.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 *
 * @author Brain&Boom Team
 */
public class Tablero {

    private final int HEIGHT = 600;
    private final int WIDTH = 800;

    //Lista que contiene las coordenadas de los espacios que hay que dejar sin bloques para garantizar que los jugadores no queden encerrados
    private final List<String> BLANKS = Stream.of("25, 25", "50, 25", "25, 50", "25, 400", "25, 425", "50, 425", "600, 25", "625, 25", "625, 50", "600, 425", "625, 425", "625, 400").collect(Collectors.toList());

    private ArrayList<Bloque> blocks;

    public Tablero() {
        blocks = new ArrayList<>();
        createBloacks();
    }

    public void createBloacks() {
        //Banderas
        boolean putRow = true;
        boolean putColumn = true;
        //Recorrer el tablero para poner los bloques solidos y blandos
        for (int i = 0; i < HEIGHT; i += 25) {
            for (int j = 0; j < WIDTH; j += 25) {
                //Condición para tomar los espacios dentro del borde del tablero
                if (i > 0 && i < HEIGHT - 25 && j > 0 && j < WIDTH - 25) {
                    int randomNum = (new Random().nextInt(9) + 0) % 2;
                    if (putRow && putColumn && !BLANKS.contains(j + ", " + i)) { //Poner los bloques solidos, dejando una columna y fila de por medio
                        blocks.add(new Bloque(j, i, TipoBloque.SOLID));
                    } else if (!BLANKS.contains(j + ", " + i) && randomNum == 0) { //En caso de que la coordenada no esté en la lista y el número es par, se pone el bloque
                        blocks.add(new Bloque(j, i, TipoBloque.SOFT));
                    }
                } else { //Tomar el borde del tablero para poner los bloques solidos
                    blocks.add(new Bloque(j, i, TipoBloque.SOLID));
                }
                putColumn = changeValue(putColumn);
            }
            putRow = changeValue(putRow);
        }
    }

    public ArrayList<Bloque> getBlocks() {
        return blocks;
    }

    private boolean changeValue(boolean b) {
        if (b) {
            b = false;
        } else {
            b = true;
        }
        return b;
    }

}
