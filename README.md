# FronEnd npm package usage 
PDF файлын Notly системээр блокчэйн дээр баталгаажсан эсэхийг шалгах сан. React js project хэрэглэж үзэв. 


### Ажиллуулах тайлбар 

```
<<< main function >>>

 function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const fileType = ["application/pdf"];

    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        console.log("*****");
        const reader = new FileReader();
        reader.onload = (e) => {
          const view = new Int8Array(e.target.result);
          Verify.verify(view, "https://node.teo.mn")
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error("test", err.message); 
            });
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setFile(null);
      }
    }
  }
- **reader.readAsArrayBuffer**  тусламжтайгаар pdf file array buffer байдлаар уншина. 
   **reader.onload** уншсан pdf file агуулгыг Int8Array руу хөрвүүлж байгаа. 
   **Verify.verify(view, "https://node.teo.mn")** сан дуудаж хөрвүүлсэн утгаа дамжуулна.
```

### Гаралт

```
export interface VerifyResultInterface { 
  state: 'REVOKED' | 'EXPIRED' | 'ISSUED' | 'APPROVE_PENDING' | 'INVALID',
  metadata: MetaDataInterface, 
  cert: {}, 
  issuer: {isActive?: boolean}, 
  isTestnet: boolean, 
  isUniversity?: boolean 
}
```

##### state нь
- ISSUED бол баталгаажсан файл. 
- REVOKED бол хүчингүй болгосон файл
- EXPIRED бол хугацаа нь дууссан файл,
- APPROVE_PENDING бол их сургуулийн диплом БЕГ баталгаажуулахыг хүлээж буй
- INVALID бол баталгаажаагүй файл.
##### metadata нь 
файлд нэмэлтээр бичсэн утгууд.
##### cert нь 
блокчэйн дээр бичигдсэн мэдээлэл.
##### issuer нь 
баталгаажуулагчийн мэдээлэл.
##### isTestnet нь 
тест сүлжээнд баталжуулсан бол true байна.
##### isUniversity нь 
их сургуулийн диплом үед true байна.
  