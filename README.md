# prettyTEI
Some tools and styles for TEI

## Useful links and inspiration
 * [TEI Boilerplate](http://dcl.ils.indiana.edu/teibp/)

## How to use :

- Open the file index.html with your favorite navigator
- Drag & Drop your TEI file(s)
- Clic on them to see TEI-CSS style

## How to edit/re-regenerate LESS/CSS

- Less files to edit are less/viewContent.less & less/viewContent.lessviewForm.less 
- Use viewContent.less to generate : dist/css/contentTei.min.css
- Use viewForm.less  to generate : dist/css/formTei.min.css

### Regenerate CSS via less files

- Install node modules :

```
	cd prettyTei
```

```
	npm install
```
- renegerate files

```
	lessc less/viewForm.less --clean-css="--s0" > dist/css/formTei.min.css
```

```
	lessc less/viewContent.less --clean-css="--s0" > dist/css/contentTei.min.css
```

- to generate ISTEX-RD stylesheets

```
	lessc less/refbibs.less > test.css
```