package com.project6.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "specializations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String category;
    private String name;
    private String slug;

}
