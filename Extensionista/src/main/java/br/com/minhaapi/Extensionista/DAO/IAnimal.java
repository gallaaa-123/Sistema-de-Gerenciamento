package br.com.minhaapi.Extensionista.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.minhaapi.Extensionista.model.Animal;

public interface IAnimal extends CrudRepository<Animal, Integer>{

}
