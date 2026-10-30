"""Folha de contato: python3 sheet.py <saida.png> <colunas> <img1> <img2> ... (miniaturas 800×450)"""
import sys
from PIL import Image, ImageDraw
out=sys.argv[1]; cols=int(sys.argv[2]); fs=sys.argv[3:]; W,H=800,450
rows=(len(fs)+cols-1)//cols; sheet=Image.new("RGB",(cols*W,rows*(H+24)),(240,243,247)); d=ImageDraw.Draw(sheet)
for i,f in enumerate(fs):
    im=Image.open(f).convert("RGB").resize((W,H),Image.LANCZOS); x=(i%cols)*W; y=(i//cols)*(H+24)
    sheet.paste(im,(x,y+24)); d.text((x+8,y+6),f.split("/")[-1],fill=(0,43,73))
sheet.save(out); print(out,sheet.size)
