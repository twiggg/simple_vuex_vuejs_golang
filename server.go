package main

import (
	//"bytes"
	"github.com/cyclopsci/apollo"
	"github.com/go-zoo/bone"
	"golang.org/x/net/context"
	"html/template"
	//"log"
	"net/http"
	//"os"
)

func init() {
	chain := apollo.New()

	r := bone.New()
	ctx0 := context.Background()
	r.Get("/test", chain.With(ctx0).ThenFunc(testHandler))
	r.Get("/", chain.With(ctx0).ThenFunc(homeHandler))
	http.Handle("/", r)
}

type Model struct {
	Data   interface{}
	Module string
}

func homeHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello young visitor, welcome."))
}

func testHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.New("page").ParseFiles("./static/templates/html/page.html")
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	model := Model{Data: struct{}{}, Module: "test"}
	tmpl.Execute(w, model)
}

/*
func jsData() string {
	tmpl, err := template.New("data").ParseFiles("./static/templates/js/data.js")
	if err != nil {
		return err.Error()
	}
	buf := bytes.NewBuffer([]byte(""))
	tmpl.Execute(buf, struct{}{})
	return buf.String()
}
*/
