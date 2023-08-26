package com.gamerpay.assessmentproject.CoolText;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoolTextRepository extends  JpaRepository<CoolText, Long>{
}
