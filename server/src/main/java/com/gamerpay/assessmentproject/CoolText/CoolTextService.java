package com.gamerpay.assessmentproject.CoolText;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoolTextService {

    private final CoolTextRepository coolTextRepository;
    @Autowired
    public CoolTextService(CoolTextRepository coolTextRepository) {
        this.coolTextRepository = coolTextRepository;
    }

    public List<CoolText> getAllCoolTexts() {
        return coolTextRepository.findAll();
    }

    public CoolText createNewCoolText(CoolText coolText) {
        CoolText newCoolText = coolTextRepository.save(coolText);
        return newCoolText;
    }

    @Transactional
    public void updateCoolText(Long id, String newText) {
        CoolText text = coolTextRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Text not found with ID: " + id));

        text.setText(newText);
        coolTextRepository.save(text);
    }

    public CoolText getCoolText(Long id) {

        CoolText coolText = coolTextRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Text not found with ID: " + id));
    return coolText;
    }
}
