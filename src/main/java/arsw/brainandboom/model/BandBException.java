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
public class BandBException extends Exception {

    public BandBException(String message) {
        super(message);
    }

    public BandBException(String message, Throwable cause) {
        super(message, cause);
    }

}
