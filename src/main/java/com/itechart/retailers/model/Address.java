package com.itechart.retailers.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "address")
public class Address extends Identity {
    @Column(name = "state_code", length = 2)
    private String stateCode;

    @Column(name = "city")
    private String city;

    @Column(name = "first_line")
    private String firstLine;

    @Column(name = "second_line")
    private String secondLine;
}
