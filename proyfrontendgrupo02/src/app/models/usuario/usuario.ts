export class Usuario {
    _id!: string;
    email!: string;
    password!: string;
    dniUsuario !: string;
    edadUsuario !: number;
    nombres!: string;
    apellido!: string;
    tipoUsuario!: string;

    Usuario(id: string = "", email: string = "", password: string = "", nombres: string = "", apellido: string = "", tipoUsuario: string = "",edadUsuario: number = 0,dniUsuario: string = "") {
        this._id = id;
        this.email = email;
        this.dniUsuario = dniUsuario;
        this.edadUsuario = edadUsuario;
        this.password = password;
        this.nombres = nombres;
        this.apellido = apellido;
        this.tipoUsuario = tipoUsuario;
    }
}
