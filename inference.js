export function predict(m,values){
 const missing=[];const x=m.features.map((f,i)=>{let v=values[f];if(v===null||v===undefined||v===''){missing.push(f);return m.medians[i]}v=Number(v);if(!Number.isFinite(v))throw Error('Parameter values must be finite numbers.');return v});
 if(x[0]<0||x[0]>14)throw Error('pH must be between 0 and 14.');if(x[1]<=0)throw Error('Hardness must be greater than zero.');if(x.slice(1).some(v=>v<0))throw Error('Concentrations must not be negative.');
 let f=[...x.slice(0,6),x[7],Math.abs(x[0]-7),x[2]/x[1]].map((v,i)=>(v-m.center[i])/m.scale[i]);let d=m.intercept;
 for(let j=0;j<m.sv.length;j++){let dist=0;for(let k=0;k<f.length;k++){let z=f[k]-m.sv[j][k];dist+=z*z}d+=m.dual[j]*Math.exp(-m.gamma*dist)}
 let z=-d*m.A+m.B;let r01=z>=0?Math.exp(-z)/(1+Math.exp(-z)):1/(1+Math.exp(z));r01=Math.min(1-1e-7,Math.max(1e-7,r01));let r10=1-r01;
 // LIBSVM multiclass_probability, including its binary convergence tolerance.
 let Q=[[r10*r10,-r10*r01],[-r10*r01,r01*r01]],p=[.5,.5],Qp=[0,0];
 for(let iter=0;iter<100;iter++){let pQp=0;for(let t=0;t<2;t++){Qp[t]=Q[t][0]*p[0]+Q[t][1]*p[1];pQp+=p[t]*Qp[t]}if(Math.max(...Qp.map(v=>Math.abs(v-pQp)))<.0025)break;for(let t=0;t<2;t++){let diff=(-Qp[t]+pQp)/Q[t][t];p[t]+=diff;pQp=(pQp+diff*(diff*Q[t][t]+2*Qp[t]))/(1+diff)/(1+diff);for(let j=0;j<2;j++){Qp[j]=(Qp[j]+diff*Q[t][j])/(1+diff);p[j]/=1+diff}}}
 return {probability:p[1],prediction:p[1]>=m.threshold?1:0,threshold:m.threshold,imputed:missing.filter(f=>!['Organic_carbon','Turbidity'].includes(f)),model:'SVM NoSMOTE',version:m.sha256.slice(0,12)};
}
