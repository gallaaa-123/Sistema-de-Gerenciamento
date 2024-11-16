package br.com.minhaapi.Extensionista.controller;

import br.com.minhaapi.Extensionista.model.Animal;
import br.com.minhaapi.Extensionista.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    // Endpoint para salvar um novo animal
    @PostMapping("/salvar")
    public Animal salvarAnimal(@RequestBody Animal animal) {
        return animalService.salvarAnimal(animal);
    }

    // Endpoint para consultar todos os animais
    @GetMapping("/consultar")
    public List<Animal> consultarAnimais() {
        return animalService.consultarAnimais();
    }
}
