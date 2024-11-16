package br.com.minhaapi.Extensionista.repository;

import br.com.minhaapi.Extensionista.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    // Não precisa de métodos adicionais para consultar todos os animais
}
