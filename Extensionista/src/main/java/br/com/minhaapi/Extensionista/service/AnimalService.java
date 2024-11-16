package br.com.minhaapi.Extensionista.service;

import br.com.minhaapi.Extensionista.model.Animal;
import br.com.minhaapi.Extensionista.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    // Método para salvar um novo animal
    public Animal salvarAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    // Método para consultar todos os animais
    public List<Animal> consultarAnimais() {
        return animalRepository.findAll();
    }
}
