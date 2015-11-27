-- Table: cycles

-- DROP TABLE cycles;

CREATE TABLE cycles
(
  story uuid NOT NULL,
  index integer NOT NULL,
  CONSTRAINT cycles_pkey PRIMARY KEY (story, index),
  CONSTRAINT cycles_story_fkey FOREIGN KEY (story)
      REFERENCES stories (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
)

  
-- Table: stories

-- DROP TABLE stories;

CREATE TABLE stories
(
  id uuid NOT NULL,
  title character varying(200),
  username character varying(100),
  CONSTRAINT stories_pkey PRIMARY KEY (id),
  CONSTRAINT stories_username_fkey FOREIGN KEY (username)
      REFERENCES users (name) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
)

-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  name character varying(20) NOT NULL,
  password character(40),
  email character varying(100),
  verified bit(1),
  CONSTRAINT users_pkey PRIMARY KEY (name),
  CONSTRAINT users_email_key UNIQUE (email)
)