import { Component, OnInit , ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Race } from '../../../models/race';
import { RaceService } from '../../../services/race.service';
import { Specie } from '../../../models/specie';
import { SpecieService } from '../../../services/specie.service';
import { Hair } from '../../../models/hair';
import { HairService } from '../../../services/hair.service';
import { Habitat } from '../../../models/habitat';
import { HabitatService } from '../../../services/habitat.service';
import { Character } from '../../../models/character';
import { CharacterService } from '../../../services/character.service';
import { UploadService } from '../../../services/upload.service';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  @ViewChild('information') modalInfo: Element;

  //Para form y registrar animales
  animalForm: FormGroup;
  public animal: Animal;
  public p : String;
  public status: string;
  public id: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar animales y realizar paginacion
  public animals: Animal[];
  public busquedaClient = null;
  public busqueda3;
  pag: number = 0;
  totalRegistros: number = 0;

  //Arreglos para selects
  selectForm: FormGroup;
  raceForm: FormGroup;
  public status2: string;
  public title: string;
  public specie: Specie;
  public race: Race;
  public hair: Hair;
  public character: Character;
  public habitat: Habitat;
  public clients: Client[];
  public clients2: Client[];
  public hairs: Hair[];
  public species: Specie[];
  public characters: Character[];
  public habitats: Habitat[];
  public races: Race[];

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _clientService: ClientService,
    private _raceService: RaceService,
    private _specieService: SpecieService,
    private _hairService: HairService,
    private _habitatService: HabitatService,
    private _characterService: CharacterService,
    private _animalService: AnimalService
  ) { 
    this.animal = new Animal('','','','','','','','','','','','','','','','','','','','');
    this.specie = new Specie('','','','','');
    this.race = new Race('','','','','','');
    this.hair = new Hair('','','','','');
    this.habitat = new Habitat('','','','','');
    this.character = new Character('','','','','');

    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }
  openModalBusqueda(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  ngOnInit() {
    this.cargando = false;
    this.getClients();
    this.getHabitatsA();
    this.getCharactersA();
    this.getHairsA();
    this.getSpeciesA();
    this.animalForm = this.pf.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      sex: ['', Validators.required],
      birthdate: ['', Validators.required],
      specie: ['', Validators.required],
      race: [''],
      character: [''],
      color: [''],
      hair: [''],
      habitat: [''],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      sterilized: [''],
      nails: [''],
      notes: [''],
      image: ['']
    });
    this.selectForm = this.pf.group({
      name: ['', Validators.required],
    });
    this.raceForm = this.pf.group({
      name: ['', Validators.required],
      specie: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.animalForm.reset();
      }
    });
    this.animalForm.reset();
    this.animal.image='';
    this.getClientsA();
  }

  openModaledit(content, animal: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.animalForm.reset();
      }
    });
    this.getClientsA();
    if(animal.race.status=='A' && animal.specie.status=='A'){
      this.animalForm.get('specie').setValue(animal.specie._id);
      this.getRacesASpecie();
      this.animalForm.get('race').setValue(animal.race._id);
    }else{
      if(animal.specie.status=='B'){
        this.animalForm.get('specie').reset();
        this.animalForm.get('race').reset();
      }else{
        this.animalForm.get('specie').setValue(animal.specie._id);
        this.getRacesASpecie();
        this.animalForm.get('race').reset();
      }
    }
    this.animal._id = animal._id;
    this.animalForm.get('client').setValue(animal.client._id);
    this.animalForm.get('name').setValue(animal.name);
    this.animalForm.get('sex').setValue(animal.sex);    
    //var p = animal.birthdate;
    this.animalForm.get('birthdate').setValue( animal.birthdate);

    this.animalForm.get('weight').setValue(animal.weight);
    this.animalForm.get('height').setValue(animal.height);
    if(animal.color !=null){
      this.animalForm.get('color').setValue(animal.color);
    }else{
      this.animalForm.get('color').reset();
    }
    if(animal.character!=null){
      this.animalForm.get('character').setValue(animal.character._id);
    }else{
      this.animalForm.get('character').reset();
    }
    if(animal.habitat!=null){
      this.animalForm.get('habitat').setValue(animal.habitat._id);
    }else{
      this.animalForm.get('habitat').reset();
    }
    if(animal.hair!=null){
      this.animalForm.get('hair').setValue(animal.hair._id);
    }else{
      this.animalForm.get('hair').reset();
    }
    if(animal.notes!=null){
      this.animalForm.get('notes').setValue(animal.notes);
    }else{
      this.animalForm.get('notes').reset();
    }
    if(animal.nails=='SI'){
      this.animalForm.get('nails').setValue(true);
    }else{
      this.animalForm.get('nails').setValue(false);
    }
    if(animal.sterilized=='SI'){
      this.animalForm.get('sterilized').setValue(true);
    }else{
      this.animalForm.get('sterilized').setValue(false);
    }
    if(animal.image || animal.image!=null){
      this.animal.image=animal.image
    }else{
      this.animal.image='';
    }

  }

  openModalStatus(content, animal: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateAnimal(animal);
      }
      if(result=='Activate'){
        this.activateAnimal(animal);
      }
    }, (reason) => {
    });
    this.animal.name = animal.name;
    this.animal.client = animal.client.name + " " + animal.client.paternal_surname;
  }

  openModaldetails(content, animal: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.animal.client = animal.client.name + " " + animal.client.paternal_surname;
    if (animal.client.maternal_surname){
      this.animal.client = this.animal.client + " " + animal.client.maternal_surname;
    }
    this.animal.name = animal.name;
    this.animal.sex = animal.sex;
    this.animal.birthdate = animal.birthdate;
    this.animal.specie = animal.specie.name;
    this.animal.race = animal.race.name;
    this.animal.color = animal.color;
    if (animal.character!=null){
      this.animal.character = animal.character.name;
    }else{
      this.animal.character = animal.character;
    }
    if (animal.hair!=null){
      this.animal.hair = animal.hair.name;
    }else{
      this.animal.hair = animal.hair;
    }
    if (animal.habitat!=null){
      this.animal.habitat = animal.habitat.name;
    }else{
      this.animal.habitat = animal.habitat;
    }
    this.animal.image = animal.image;
    this.animal.notes = animal.notes;
    this.animal.height = animal.height;
    this.animal.weight = animal.weight;
    this.animal.sterilized = animal.sterilized;
    this.animal.nails = animal.nails;
    this.animal.start_date = animal.start_date;
    this.animal.end_date = animal.end_date;
  }

  openModalselect(content, opc: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.selectForm.reset();
      }
    });
    if(opc==1){
      this.title="A ESPECIE";
    }
    if(opc==2){
      this.title="O TIPO DE PELO";
    }
    if(opc==3){
      this.title="A HABITAT";
    }
    if(opc==4){
      this.title="O CARACTER";
    }
  }

  openModalselectRace(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.raceForm.reset();
      }
    });
    this.raceForm.get('specie').setValue(null);
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  ////////////////////////////////////////////////////////////
  //          AGREGAR ANIMAL Y GUARDAR IMAGEN               //
  ////////////////////////////////////////////////////////////
  onSubmitAddAnimal(){
    this.animal.client = this.animalForm.get('client').value;
    this.animal.name = this.animalForm.get('name').value;
    this.animal.sex = this.animalForm.get('sex').value;
    this.animal.birthdate =this.animalForm.get('birthdate').value;
    this.animal.specie = this.animalForm.get('specie').value;
    this.animal.race = this.animalForm.get('race').value;
    this.animal.character = this.animalForm.get('character').value;
    this.animal.color = this.animalForm.get('color').value;
    this.animal.hair = this.animalForm.get('hair').value;
    this.animal.habitat = this.animalForm.get('habitat').value;
    this.animal.height = this.animalForm.get('height').value;
    this.animal.weight = this.animalForm.get('weight').value;
    if( this.animalForm.get('sterilized').value==true){
      this.animal.sterilized = 'SI';
    }else{
      this.animal.sterilized = 'NO';
    }
    if( this.animalForm.get('nails').value==true){
      this.animal.nails = 'SI';
    }else{
      this.animal.nails = 'NO';
    }
    this.animal.notes = this.animalForm.get('notes').value;
    
    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.animal = response.animal;

          if(this.fileToUpload && this.animalForm.get('image').value!=null){
            //Subir imagen del animal
            this._uploadService.makeFileRequest(this.url+'upload-image-animal/'+this.animal._id, [], this.fileToUpload, this.token, 'image')
            .then((result: any) => {
              this.animal.image = result.image;
            });
          }         
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

  ////////////////////////////////////////////////////////////
  //                   EDITAR ANIMAL                        //
  ////////////////////////////////////////////////////////////
  onSubmitEditAnimal(){
    this.animal.client = this.animalForm.get('client').value;
    this.animal.name = this.animalForm.get('name').value;
    this.animal.sex = this.animalForm.get('sex').value;
    this.animal.birthdate =this.animalForm.get('birthdate').value;
    this.animal.specie = this.animalForm.get('specie').value;
    this.animal.race = this.animalForm.get('race').value;
    this.animal.character = this.animalForm.get('character').value;
    this.animal.color = this.animalForm.get('color').value;
    this.animal.hair = this.animalForm.get('hair').value;
    this.animal.habitat = this.animalForm.get('habitat').value;
    this.animal.height = this.animalForm.get('height').value;
    this.animal.weight = this.animalForm.get('weight').value;
    if( this.animalForm.get('sterilized').value==true){
      this.animal.sterilized = 'SI';
    }else{
      this.animal.sterilized = 'NO';
    }
    if( this.animalForm.get('nails').value==true){
      this.animal.nails = 'SI';
    }else{
      this.animal.nails = 'NO';
    }
    this.animal.notes = this.animalForm.get('notes').value;
    
    this._animalService.editAnimal(this.token, this.animal._id, this.animal).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.animal = response.animal;

          if(this.fileToUpload){
            //Subir imagen del animal
            //console.log(this.fileToUpload);
            this._uploadService.makeFileRequest(this.url+'upload-image-animal/'+this.animal._id, [], this.fileToUpload, this.token, 'image')
            .then((result: any) => {
              this.animal.image = result.image;
              this.busquedaClient=this.animal.client;
              this.getAnimalsofClient();
            });
          }
          this.getAnimalsofClient();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //             CAMBIAR ESTADO DE PRODUCTO                 //
  ////////////////////////////////////////////////////////////
  deactivateAnimal(animal : Animal){
    this._animalService.deactivateAnimal(this.token, animal._id).subscribe(
      response => {
        if(!response.animal){
          console.log("Error en el servidor");
        }
        this.getAnimalsofClient();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateAnimal(animal : Animal){
    this._animalService.activateAnimal(this.token, animal._id).subscribe(
      response => {
        if(!response.animal){
          console.log("Error en el servidor");
        }
        this.getAnimalsofClient();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //    OBTENER CLIENTES, ANIMALES Y REALIZAR PAGINACION    //
  ////////////////////////////////////////////////////////////
  getClients(){
    this._clientService.getClientsSelect(this.token).subscribe(
      response => {
        
        if(response.clients){
          this.clients = response.clients;
          //this.totalRegistros = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getAnimalsofClient(){
    this.cargando = true;
    this._animalService.getAnimalsClient(this.token, this.busquedaClient, this.pag).subscribe(
      response => {
        
        if(response.animals){
          this.animals = response.animals;
          this.totalRegistros = response.total;
          this.cargando = false;
          if(this.totalRegistros==0){
            this.openModalInfo(this.modalInfo);
          }
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  cambiarPag( valor: number){
    let pag = this.pag + valor;

    if( pag >= this.totalRegistros){
      return;
    }
    if ( pag < 0 ){
      return;
    }

    this.pag += valor;
    this.getAnimalsofClient();
  }

  ////////////////////////////////////////////////////////////
  //             OBTENER REGISTROS PARA SELECTS             //
  ////////////////////////////////////////////////////////////
  //Obtener registros de Habitat
  getHabitatsA(){
    this._habitatService.getHabitatsA().subscribe(
      response => {
        if(response.habitats){
          this.habitats = response.habitats;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  //Obtener registros de Character
  getCharactersA(){
    this._characterService.getCharactersA().subscribe(
      response => {
        if(response.characters){
          this.characters = response.characters;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  //Obtener registros de Hairs
  getHairsA(){
    this._hairService.getHairsA().subscribe(
      response => {
        if(response.hairs){
          this.hairs = response.hairs;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  //Obtener registros de Hairs
  getSpeciesA(){
    this._specieService.getSpeciesA().subscribe(
      response => {
        if(response.species){
          this.species = response.species;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  //Obtener registros de Races
  getRacesASpecie(){
    this.animalForm.get('race').reset();
    var busquedaSpecie = this.animalForm.get('specie').value;
    if (busquedaSpecie=="null" || busquedaSpecie==null){
      this.animalForm.get('race').setValue("null");
    }else{
      this._raceService.getRacesASpecie(busquedaSpecie).subscribe(
        response => {
          if(response.races){
            this.races = response.races;
          }

        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
  }
  //Obtener registros de Clientes activos
  getClientsA(){
    this._clientService.getClientsA(this.token).subscribe(
      response => {
        if(response.clients){
          this.clients2 = response.clients;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Registrar Specie
  onSubmitAddSpecie(){
    this.specie.name = this.selectForm.get('name').value;

    this._specieService.addSpecie(this.token, this.specie).subscribe(
      response => {
        if(!response.specie){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.specie = response.specie;
          this.getSpeciesA();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }

  //Registrar Hair
  onSubmitAddHair(){
    this.hair.name = this.selectForm.get('name').value;

    this._hairService.addHair(this.token, this.hair).subscribe(
      response => {
        if(!response.hair){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.hair = response.hair;
          this.getHairsA();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }

  //Registrar Habitat
  onSubmitAddHabitat(){
    this.habitat.name = this.selectForm.get('name').value;

    this._habitatService.addHabitat(this.token, this.habitat).subscribe(
      response => {
        if(!response.habitat){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.habitat = response.habitat;
          this.getHabitatsA();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }

  //Registrar Character
  onSubmitAddCharacter(){
    this.character.name = this.selectForm.get('name').value;

    this._characterService.addCharacter(this.token, this.character).subscribe(
      response => {
        if(!response.character){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.character = response.character;
          this.getCharactersA();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }

  //Registrar Race
  onSubmitAddRace(){
    this.race.name = this.raceForm.get('name').value;
    this.race.specie = this.raceForm.get('specie').value;

    this._raceService.addRace(this.token, this.race).subscribe(
      response => {
        if(!response.race){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.race = response.race;
          this.getRacesASpecie();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }
}
