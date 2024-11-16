package br.com.minhaapi.Extensionista.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animal")
public class Animal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "nome", length = 200, nullable = true)
	private String nome;
	
	@Column(name = "especie", length = 200, nullable = true)
	private String especie;
	
	@Column(name = "idade", length = 3, nullable = true)
	private String idade;
	
	@Column(name = "peso", length = 200, nullable = true)
	private String peso;
	
	@Column(name = "pelagem", length = 200, nullable = true)
	private String pelagem;
	
	@Column(name = "castrado", length = 200, nullable = true)
	private String castrado;
	
	@Column(name = "lesao", length = 200, nullable = true)
	private String lesao;
	
	@Column(name = "teve_filhotes", length = 200)
	private String teve_filhotes;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEspecie() {
		return especie;
	}

	public void setEspecie(String especie) {
		this.especie = especie;
	}

	public String getIdade() {
		return idade;
	}

	public void setIdade(String idade) {
		this.idade = idade;
	}

	public String getPeso() {
		return peso;
	}

	public void setPeso(String peso) {
		this.peso = peso;
	}

	public String getPelagem() {
		return pelagem;
	}

	public void setPelagem(String pelagem) {
		this.pelagem = pelagem;
	}

	public String getCastrado() {
		return castrado;
	}

	public void setCastrado(String castrado) {
		this.castrado = castrado;
	}

	public String getLesao() {
		return lesao;
	}

	public void setLesao(String lesao) {
		this.lesao = lesao;
	}

	public String getTeve_filhotes() {
		return teve_filhotes;
	}

	public void setTeve_filhotes(String teve_filhotes) {
		this.teve_filhotes = teve_filhotes;
	}	
	
	
	
}
