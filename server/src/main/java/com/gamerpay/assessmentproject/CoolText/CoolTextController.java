package com.gamerpay.assessmentproject.CoolText;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/coolText")
public class CoolTextController {

    private final CoolTextService coolTextService;
    @Autowired
    public CoolTextController(CoolTextService coolTextService) {
        this.coolTextService = coolTextService;
    }
    @GetMapping
    public List<CoolText> getAllCoolTexts() {
        return  coolTextService.getAllCoolTexts();
    }

    @GetMapping(path = "{coolTextId}")
    public CoolText getCoolTextById(@PathVariable("coolTextId") Long id) {
        return  coolTextService.getCoolText(id);
    }

    @PostMapping
    public CoolText createCoolText(@RequestBody CoolText coolText) {
        System.out.println(coolText);
        CoolText newCoolText = coolTextService.createNewCoolText(coolText);
        return newCoolText;
    }
    @PutMapping(path = "{updateId}")
    public void updateText(@PathVariable("updateId") Long id, @RequestParam String newText) {
        coolTextService.updateCoolText(id, newText);
    }
}
