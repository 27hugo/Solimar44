SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS solimar44;

USE solimar44;

CREATE TABLE IF NOT EXISTS autos (
  aut_id int(11) NOT NULL,
  aut_patente varchar(255) NOT NULL,
  aut_anio varchar(255) NOT NULL,
  aut_marca varchar(255) NOT NULL,
  aut_observacion varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS licencias (
  lic_id int(11) NOT NULL,
  lic_emision datetime NOT NULL,
  lic_vencimiento datetime NOT NULL,
  lic_frente varchar(255) NOT NULL,
  lic_reverso varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mantenciones (
  man_id int(11) NOT NULL,
  man_fecha datetime NOT NULL,
  man_tipo varchar(255) NOT NULL,
  man_lugar varchar(255) NOT NULL,
  man_vencimiento datetime DEFAULT NULL,
  aut_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS roles (
  rol_id int(11) NOT NULL,
  rol_nombre varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (rol_id, rol_nombre) VALUES
(1, 'Administrador');

CREATE TABLE IF NOT EXISTS tipos_licencias (
  tipo_id int(11) NOT NULL,
  lic_id int(11) NOT NULL,
  lic_nombre varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
  usr_rut varchar(255) NOT NULL,
  usr_nombre varchar(255) NOT NULL,
  usr_apellido varchar(255) NOT NULL,
  usr_fnacimiento datetime NOT NULL,
  usr_direccion varchar(255) DEFAULT NULL,
  usr_correo varchar(255) DEFAULT NULL,
  usr_contrasena varchar(255) DEFAULT NULL,
  usr_telefono varchar(255) NOT NULL,
  usr_estado varchar(255) NOT NULL DEFAULT 'Activo',
  usr_foto varchar(255) NOT NULL,
  usr_cdi_frente varchar(255) NOT NULL,
  usr_cdi_reverso varchar(255) NOT NULL,
  lic_id int(11) DEFAULT NULL,
  rol_id int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios (usr_rut, usr_nombre, usr_apellido, usr_fnacimiento, usr_direccion, usr_correo, usr_contrasena, usr_telefono, usr_estado, usr_foto, usr_cdi_frente, usr_cdi_reverso, lic_id, rol_id) VALUES
('17.720.994-5', 'hugo', 'mancilla', '2021-03-29 01:43:04', 'asd', 'asd', '$2b$10$sU3mHzCeUd5TGwqZHwnQtOTexsMDBvVqrACb0vJGb2EIFiT7cDHTe', 'asd', 'Activo', 'img', 'img', 'img', NULL, 1);

CREATE TABLE usuarios_autos (
  uas_id int(11) NOT NULL,
  usr_rut varchar(255) NOT NULL,
  aut_id int(11) NOT NULL,
  uas_isduenio int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE autos
  ADD PRIMARY KEY (aut_id),
  ADD UNIQUE KEY IDX_4d38c283fbf881c6d3946a19f3 (aut_patente);

ALTER TABLE licencias
  ADD PRIMARY KEY (lic_id),
  ADD UNIQUE KEY IDX_caf424730d30768e1ac423fdf4 (lic_frente),
  ADD UNIQUE KEY IDX_e9d72ebb1d892239487a8d8cbe (lic_reverso);

ALTER TABLE mantenciones
  ADD PRIMARY KEY (man_id),
  ADD KEY FK_11b74f1eceb70a56ca57ad2fa08 (aut_id);

ALTER TABLE roles
  ADD PRIMARY KEY (rol_id),
  ADD UNIQUE KEY IDX_96aaed1c729577ea6fe9934840 (rol_nombre);

ALTER TABLE tipos_licencias
  ADD PRIMARY KEY (tipo_id),
  ADD KEY FK_ad74b3c8367e24071d49ec4dd0c (lic_id);

ALTER TABLE usuarios
  ADD PRIMARY KEY (usr_rut),
  ADD UNIQUE KEY IDX_d8d43e0073eb466e693f8a94b4 (usr_foto),
  ADD UNIQUE KEY IDX_ce10626e9883f8c61db4ff75f6 (usr_cdi_frente),
  ADD UNIQUE KEY IDX_f7b1699478e5a2897b8114a5ba (usr_cdi_reverso),
  ADD UNIQUE KEY IDX_4b991abfe8866a2799238d0abc (usr_correo),
  ADD UNIQUE KEY IDX_7fc8434adc648093a66ec135a8 (lic_id),
  ADD KEY FK_9e519760a660751f4fa21453d3e (rol_id);

ALTER TABLE usuarios_autos
  ADD PRIMARY KEY (uas_id),
  ADD KEY FK_a17df9eb681bead9dbc73a163e1 (aut_id),
  ADD KEY FK_541d1370249463f14caebc71035 (usr_rut);


ALTER TABLE autos
  MODIFY aut_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE licencias
  MODIFY lic_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE mantenciones
  MODIFY man_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE roles
  MODIFY rol_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE tipos_licencias
  MODIFY tipo_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE usuarios_autos
  MODIFY uas_id int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE mantenciones
  ADD CONSTRAINT FK_11b74f1eceb70a56ca57ad2fa08 FOREIGN KEY (aut_id) REFERENCES `autos` (aut_id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE tipos_licencias
  ADD CONSTRAINT FK_ad74b3c8367e24071d49ec4dd0c FOREIGN KEY (lic_id) REFERENCES licencias (lic_id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE usuarios
  ADD CONSTRAINT FK_7fc8434adc648093a66ec135a88 FOREIGN KEY (lic_id) REFERENCES licencias (lic_id) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT FK_9e519760a660751f4fa21453d3e FOREIGN KEY (rol_id) REFERENCES `roles` (rol_id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE usuarios_autos
  ADD CONSTRAINT FK_541d1370249463f14caebc71035 FOREIGN KEY (usr_rut) REFERENCES usuarios (usr_rut) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT FK_a17df9eb681bead9dbc73a163e1 FOREIGN KEY (aut_id) REFERENCES `autos` (aut_id) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
