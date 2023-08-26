package com.gamerpay.assessmentproject.CoolText;

import jakarta.persistence.*;

@Entity
@Table
public class CoolText {
    @Id
    @SequenceGenerator(
            name="cool_text_sequence",
            sequenceName = "cool_text_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cool_text_sequence"
    )

    private  Long id;
    private String text;

    public  CoolText() {

    }
    public CoolText(String text) {
        text = text;
    }

    public String getText() {
        return text;
    }
    public Long getId() {
        return id;
    }

    public void setText(String text) {
        this.text = text;
    }


    @Override
    public String toString() {
        return this.getText();
    }

}
