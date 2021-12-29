import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Shipment, ShipmentList } from 'src/commonDS/DS';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-display-shipment-list',
  templateUrl: './display-shipment-list.component.html',
  styleUrls: ['./display-shipment-list.component.scss']
})
export class DisplayShipmentListComponent implements OnInit , OnDestroy{

  subscription: Subscription;
  _shipmentListInfo!: ShipmentList;
  selected: boolean[] = [];

  shInfo: any = [];
  constructor(private data: DataService) { 
    let checkboxes = document.getElementsByName("shipment");
    for( let idx: number=1; idx < checkboxes.length; ++idx) {
      this.selected[idx] = false;
    }
    this.subscription = this.data.currentShipmentListInfo.subscribe(
          (message: ShipmentList) => {this._shipmentListInfo = message;});
  }

  ngOnInit(): void {
    /*
    for(let idx = 0; idx < this._shipmentListInfo.length; ++idx) {
      this.shInfo.push(this._shipmentListInfo.m_elm[idx]);
    }
    */
  }

  onSelectAll() {
    let checkboxes = document.getElementsByName("shipment");
    for(var i = 0; i < checkboxes.length; i++)  
    {
      if(this.selected[i] == false)
        this.selected[i] = true;
        else 
          this.selected[i] = false;

       /* 
        if(checkboxes[i].checked) {
          checkboxes[i].checked = false;
        } else {
          checkboxes[i].checked = true;

        }*/
    }  
  }


  /** Label A6 Generation  */
  Info = {
    title: 'A6 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'subject of document',
    keywords: 'keywords for document',
  };

  A6LabelContentsBody:Array<object> = new Array<object>();

  buildA6ContentsBody() {
    this.A6LabelContentsBody.length = 0;
    this._shipmentListInfo.m_shipmentArray.forEach((elm: Shipment) => {
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 100, '*'],
            body: [
              [ {image:"data:image/jpeg;base64,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VdUyiIiIixtxk32twvwg5q3O2VlVbrjbsH3eqpKullKGellCimIJAMXYhMSZnYmdnZ2Z2WSVizjm9CbOH2IvXwE6zU/tW7x4rHN7N24qePdscFWyvxtmziKWm3Xm1UNtttLUcw25VPUyVMkwbddr7jpKd9XZ3bl9HZiLWsKln3aX76fwP8xVTFK6REnEH36vALQwYfwje3xKIiKEUmiIiIiIiIiIiIiIiIiIiIiIiIsYZ78RX9kV1httPbPDa2ppXqGkkl2RQ6uQh0Znc+olq2o9GbR+vTXXMDNm/ZmVTnda6SSFj3x0sfkU8XUtNAbo7sxO259S06O7r3fGn+9Kg/lUf9aZYhXz+9NGm2N1WP1eES1Dvs8b7Bg4rbWG21tbp41+qyiamRxeW3yREReILVXItd2qrHXhVUVTUUdTFrsmgkeOQNWdn0JtHbVndv8ANZiwHxm3S1RhBf6KO6hvFnqYXaGYRcncncWbYbsztozbPq9X66rCqK1aMabY3o9KZcIqHR32t2tO9pu0nrtccxCyMkcz7pW/iIi+oynEREREREREREREREREREREREREUVe3us8WVvaFWfEOHTqrPfLphy33ueupaqQJ2rYqiop4pwLdrEYx0tOzbNujxsX1nd3tUowd4s9NnC/sRSfH3BWHRnltuoqHxzkt+sKz6IirymEREREWLOOb0Js4fYi9fATrKaxZxzehNnD7EXr4CdZqb2zd48Vjm9m7cVoN3aX76fwP8xVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviUREUKpNERERERERERERERERERERERERaw8af70qD+VR/1pliFbW578Ov9rt1huVPc/Aq2mpXp2jki3xTaORB1Z2cOpFq+hdHbRunXXXMDKa/ZZ1ThdaGSOFz2R1Ufl08vUtNDbozuwu+19C06uzL5/emjQnG6XH6vGJad32eR9w8cZtrDba+r0ca3VdRNTG4PLrZLziIi8QWqiLkWu01V8rwpaKmqKypl12QwRvJIejO76C2rvozO/wDksvYG4NLzdJoZb9VU9rpn6yQQlzqnoWm3VvIHUdXYmItOmov1ZrTo1oXjekEhjwmndJbIu2NG9xs0dNr3tzLIyNz/ALoWyyIi+o6nEREREREREREREREREREREREREUYO8Wemzhf2IpPj7grPqMHeLPTZwv7EUnx9wVg0Z5cNxURjnJTvCs+iIq+pdERERFizjm9CbOH2IvXwE6ymsWcc3oTZw+xF6+AnWam9s3ePFY5vZu3FaDd2l++n8D/MVUxSz7tL99P4H+YqpilNIfxCTs/KFoYPyNnb4lERFCqTRERERERERERERFiHio46csODayFUY4xNS0lxOB56Sy0v7RdK5nGVw2QD5QgZQmDSybImNmYpB1U3eJ3vDuNMb0lRbMrcN0uCIOfII3m4mFxuEsTSA8RhCQciAyATaQSaob6TQSZxY3kqLCKqqzjbl0nIfvddaVTiMEGTzn0Db+96sAigvwr9svnVw33sWueIKrMXD807S1duxLUyVc7s5Rb3hqyd5oj2RuIs7nELyETxETqjHCT24uUfERyrdiib+y/EZ6/QXmqErZNpzS+jrtBBtI4xd+eMOpyiAcx+q2a3AKun4wGs3pH6bVgpsXp5sr2PX+q3QREUIpRF+dXSRV9LJBPHHNDMDxyRyCxDILto7Oz9HZ2+xfosQ8VHHTlhwbWQqjHGJqWkuJwPPSWWl/aLpXM4yuGyAfKEDKEwaWTZExszFIOq7NgdMfVNbrX5tq6Pe1jdZ5sF++OeEPDmJ5pqi3SVFkqZerDCzSUzE5ak/LfR21Z3ZmEhFtG0bpo/mMFcFH+0PEV1/iwRW1/+mhOcg/8A+m27P4Pu+xT94ne8O40xvSVFsytw3S4Ig58gjebiYXG4SxNIDxGEJByIDIBNpBJqhvpNBJnFjfC/Cv2y+dXDfexa54gqsxcPzTtLV27EtTJVzuzlFveGrJ3miPZG4izucQvIRPEROqlU/wCnXRusqRiM1ExrxfiglrXX5y1p1b9HTfPYFByYpRCSwFx08yuhg7ANmwBQPT2e309DGf13BneSXR3dtxvqRabn01d9NdG6LuFpfwk9uLlHxEcq3Yom/svxGev0F5qhK2Tac0vo67QQbSOMXfnjDqcogHMfqt0Fa24S3DY20kcQiY3INAAaB1AZW3KZgnilbeI3CIiIsyIvA8QHFJl9wsYZju2P8V2vDVLPr4PHOTyVNZocYFyaeNimm2vLHu5YFsYtxaN1U5uKjvE8t3shW3J3CtVa56mBxkveJY4ynpCIZRdoaWIzjcxd4TGSSQh1YhKEm0d5CjwupqvZNy6ebvWpU10EHtHZ9HOqropE8JPeF8TYP5Vrzisf620La/8AzlmhipbmH+1L6Sn8inm1d4QbY8GwAIn5pOqMcK/HTlhxk2QajA+JqWruIQNPV2Wq/Z7pQswxOe+AvKIAKYAeWPfE5u7DIWi7VuE1VLnI3LpGY/e9dabEIJ/uHPoO1ZeREUat1ERERERERERERFGDvFnps4X9iKT4+4Kz6jB3iz02cL+xFJ8fcFYNGeXDcVEY5yU7wrPoiKvqXRERERYs45vQmzh9iL18BOsprFnHN6E2cPsRevgJ1mpvbN3jxWOb2btxWg3dpfvp/A/zFVMUs+7S/fT+B/mKqYpTSH8Qk7PyhaGD8jZ2+JRERQqk0REREREREUyO3D7QLNThzzssuAsC4j/VizXXC3h9dPR00b1tQdRPUwOzTmxFFsCBnAoeWYlIb7ndg2U3UYO8Wemzhf2IpPj7gpzR2JklYGyC4sdqi8YkcymJYbG4WiN9vtbii91lzudZVXG43Gc6qrq6qUpp6qUycjkMydyIyJ3dyd3d3d3dcREXpezIKkIiIuVws5cMXaP5xcI1JT2/CGL6psPwTxyvY7jGNdbyEZDkKIAkZygCQpJOY9OURFu1ctzC7fRMvlnX1MKjaWQxsdG9oAJ1r9ezarVo/I9zXtcbgWt9VMjtw+0CzU4c87LLgLAuI/1Ys11wt4fXT0dNG9bUHUT1MDs05sRRbAgZwKHlmJSG+53YNkqb7fa3FF7rLnc6yquNxuM51VXV1UpTT1Upk5HIZk7kRkTu7k7u7u7u63u7xZ6bOF/Yik+PuC0GVhwOGNlGxzQASM+tQ+KyPdUua45AoiIphRqLOXDF2j+cXCNSU9vwhi+qbD8E8cr2O4xjXW8hGQ5CiAJGcoAkKSTmPTlERbtXLcwu2DUWKWGOVupIAR1rJHI+N2sw2K+phS97U/thsz+HviOxTldgOmsFhgscFCL3uWm8NuBSyww1RHGMj8gAcJRi2nFI/QyYmchYKhKBvbU/8TPMr8L/APVUa880bpop6otlbcBt894VxxqaSKAGM2JNvoVrdjXHV7zKxNU3rEV4ut/vNbt8Ir7lVyVVTPtAQHfJI7kWgCItq/RhZvMy6pEXo4AAsFSyScyi5divtbhe90dztlZVW6426cKqkq6WUoZ6WUCYgkAxdiExJmdiZ2dnZnZcRERUO7PTto83Hzdy+y5xcVrxvZr/AHyjsZXCvjKO708c7xUsek4OwybDdpCKWM5JHc2KRnJiCxS+brgZ9NnJ723svx8C+kVefaT00UMzfVNAuM7K4YHPJJE71hvYoiIqyptERERERERFGDvFnps4X9iKT4+4Kz6jB3iz02cL+xFJ8fcFYNGeXDcVEY5yU7wrPoiKvqXRERERYs45vQmzh9iL18BOsprFnHN6E2cPsRevgJ1mpvbN3jxWOb2btxWg3dpfvp/A/wAxVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviUREUKpNERERERERFGDvFnps4X9iKT4+4Kz6wvxW9n7lXxn8mox1hzwq80VDLQUN3o6mSlraID1dnYgdhk2G7mAzDIAkR+ToZsUpg9aylqRLJe2exaOI0z6iAxs2r5z0W/PGL2COYOTfh16y0qv7RMORcyfwDa0F7pI25x7eX9Sq2xhGOsTtJJJJoNOzLRG+2Ktwve6y2XOjqrdcbdOdLV0lVEUM9LKBOJxmBMxCYkzs4uzOzs7OvSqWtgqW60Lr/voVJnppYXasgsuIiLPvCT2aGbnGZyqvC+Hv0fhyXX/WG8kVHbH05rfRntI5/pISjfkBJsNxY9jPqss00cTdeU2HWsccT5HarBcrAS+phaN8NHYI5R5MXC33XF1VdcybzRamUVeI0toKVpmkjkakDUi0AWAglmljNiPcGhMw7yLz/SHE4atzBDezb577forfg9DLThxl57fS6jB3iz02cL+xFJ8fcFoMvow4rez9yr4z+TUY6w54VeaKhloKG70dTJS1tEB6uzsQOwybDdzAZhkASI/J0M2KZHGL2COYOTfh16y0qv7RMORcyfwDa0F7pI25x7eX9Sq2xhGOsTtJJJJoNOzKbwXGqX1DKd51XDLPZ3/qovE8Mn9a6ZouD0bVoMi5d9sVbhe91lsudHVW6426c6WrpKqIoZ6WUCcTjMCZiExJnZxdmdnZ2dcRWnbmFAoiz7wk9mhm5xmcqrwvh79H4cl1/wBYbyRUdsfTmt9Ge0jn+khKN+QEmw3Fj2M+qpvw0dgjlHkxcLfdcXVV1zJvNFqZRV4jS2gpWmaSORqQNSLQBYCCWaWM2I9waEzDFV2NUtKdV7ru6BmfJb9Lhk8+bRYdJW8igb21P/EzzK/C/wD1VGr5LTrjl7GPAfGdmDd8bR4gv+Esa3aCmilqYmCst8pQsEfNkpj2m5vAAx6RzRi2wC2u+/fSMAroqWpMk2QIt9R+itGLUslRCGR7Qb/QqFiLPvFt2aGbnBnzavFGHv0hhyLT/WGzEVZbG15TfSHtE4PpJhjbnhHvNiYN7NqsBL0iGaOVuvEbjqVLkjfG7VeLFERZe4V+BbM/jJvY0+B8M1VXbgnaCrvVV+z2uhdiiY985eSRgMwG8Ue+Vwd3GMtFzJKyNuvIbDrXDGOe7VYLlcTgZ9NnJ723svx8C+kVT74KOwYw/wAP+YOH8a44xbVYqxBYJ6S6UVut0D0Vvo62JnN98jk8tSAS8so3ZoNeV5YEJuDUEXnmkNfDVTNMBuAFccHpJYIyJRYkoiIq8phERERERERFGDvFnps4X9iKT4+4Kz6jB3iz02cL+xFJ8fcFYNGeXDcVEY5yU7wrPoiKvqXRERERYs45vQmzh9iL18BOsprFnHN6E2cPsRevgJ1mpvbN3jxWOb2btxWg3dpfvp/A/wAxVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviURF1+JcVW7B1qKtulZT0NMGrb5T03OzOW0W85Foz6C2rvp0ZQE9RFBGZp3BrW5kk2AHSScgpO9syuwRYNx5xo0dJGcOHLfJVzMZD4TWtsh0Ym0IQZ9xMTbvO4O3To/Vl5fL/jFvdmqmjv8AFHeKUz1KWMBhqImdx821mAmZmJ9rszu7/WZl5HW+nfQ+mr20JqC4Ha9rSY27ztO9ocOkha5qowbXWzSLyGXWeeHMzdsdBWcmtLX9jqmaOf8A5n6Nq7H0F3fY76NprovXr1DCsXocTphV4fK2WM7HNII3ZbCOcHMc6ztcHC4RERSK5RY2z74PssOJ+kkDHmCLBiGeSCOlaulp+VcIYgk5oxx1ce2eMN7k+0DZn3mz6sRM/VcVHHTlhwbWQqjHGJqWkuJwPPSWWl/aLpXM4yuGyAfKEDKEwaWTZExszFIOqm7xO94dxpjekqLZlbhulwRBz5BG83EwuNwliaQHiMISDkQGQCbSCTVDfSaCTOLG8rh+GVk7g+AEf3bP32KPrK6miGrKb9W399q3a4dOxuyI4d/Cpf1X/Xquqt4eFYuaG58mIuW/LCHljTto8erHyuY28237X2raZSJ4Se8L4mwfyrXnFY/1toW1/wDnLNDFS3MP9qX0lP5FPNq7wg2x4NgARPzSdUY4V+OnLDjJsg1GB8TUtXcQgaerstV+z3ShZhic98BeUQAUwA8se+Jzd2GQtFkxShr43a9Vdw6do8voutDVUj26sFh1bD5rLyIihlJIiLzeYGbNhyzpXO610cczhvjpY/LqJehaaA3Vmdxdtz6Dr0d2WliGI0tBA6qrZGxxt2ucQAO0rgkAXK81n3wfZYcT9JIGPMEWDEM8kEdK1dLT8q4QxBJzRjjq49s8Yb3J9oGzPvNn1YiZ8RcOnY3ZEcO/hUv6r/r1XVW8PCsXNDc+TEXLflhDyxp20ePVj5XMbebb9r7V2mPOM26XWM4LBRR2oN5M1TM7TTELEzi7C7bAd2Z9Wff9bo/TVfpl1xl11t2wYlpf0jF1/a6URjnb6z9Q6AXVxZtNmjM7+U68ti/1F6LCt4NZUvDD/wAmq4R36P6xv1NX+6y0HGldJrOaL9Nlsci83l/mzYczKVjtVdHJMwb5KWTyKiLoOuoP1dmcmbc2o69Gd16RepYfiNLXwNqqKRskbtjmkEHtC3wQRcIiIt1cotROJfsUMkM/bfcKi0WL+zzEdVpJFcLB9FTAYwvGAlRO/g/K12GYxDEZuH+0FyJ3z7xAcUmX3CxhmO7Y/wAV2vDVLPr4PHOTyVNZocYFyaeNimm2vLHu5YFsYtxaN1U8eIvvG/8AusGUmBv7klTXYuH/ALjHEFNTTf8AaJpXn/vjy/Mal8Mpq97tekuOvYPP6qPrp6Ro1aix6tp8lnLhi7CHJ3JOkp6rF4VWZuIIZ46hqi47qS3xFHIZiwUcZuJAQvGMgVBzCfL6MIkQPufYrFRYXslHbLZR0tut1ugClpKSliGGCliAWEIwAWYRARZmYWZmZmZmWg3Cv3gbLjMKyDS5p0VVl/fKeBikraWnmuNrriEYmdwaISniMzKUmjIDEQjbWYidmW9+CsdWTMrDNNesO3i13+zVu7wevttXHVU0+0yAtkkbuJaGJC+j9HF287Lpiba4PvWX7dnZzdy7ULqUttTW/wA9vOu1REUWt5ERY0x5xVYXwdIcFNLJe6pgJ2aidihEtrOLFK76aPr5w3aaPq2raPCY7pJheCwfacVnbEzm1jmepo2uPUASurntaLuKyWi1ZuPGHiqoxG1XTDQU9EG5hoSh5kZt5WjmfQ3JmduouLPtbyfOz5PwNxeYcxPNDT3GOoslTL0cpnaSmYnLQW5jaO2rOzu5CIto+r9NX8+wL04aI4pUupWVHqnA2BkGoHdbXbBudqu6lhbUxuNrrK6L86Srir6WOeCSOaGYGkjkjJiGQXbVnZ26Ozt9q/RettcHDWbmCthFGDvFnps4X9iKT4+4Kz6jB3iz02cL+xFJ8fcFYdGeXDcVEY5yU7wrPoiKvqXRERERYs45vQmzh9iL18BOsprFnHN6E2cPsRevgJ1mpvbN3jxWOb2btxWg3dpfvp/A/wAxVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviVhziR4gLvlhf6e02qCjE6miec6mYXMgciIB2DqzM47HfytzPq3Tp112xLiq44xupVt0rKiuqT1bfKeu1ndy2i3mEdXfQW0ZtejLJ3Gn+9Kg/lUf9aZYhXzW9NGkmKVektXh9RO50Mb7NZfiiwH8oyv1nPrWOpe4vIJyRERePLWRZLwHxVYowdGEFTLHe6VjF3atdymEdzuTDKz66vr5z3aaNo2jaPjRFOYFpJimCz/acKndE/n1Tkepw2OHUQQu7XuabtK38Uau0Q7ZPOI8+Mc4DwhcaXAuH8NXW44eeS3QjLcK8Yz8HKU6mRnKI90chxvTtEUfN0cjIBNWVXzdcc3ps5w+296+PnX160YpopZnGVoNhldc47PJHG0MNrlY3vt9rcUXusudzrKq43G4znVVdXVSlNPVSmTkchmTuRGRO7uTu7u7u7riIi9B2ZBVBFy7Ffa3C97o7nbKyqt1xt04VVJV0spQz0soExBIBi7EJiTM7Ezs7OzOy4iIiod2enbR5uPm7l9lzi4rXjezX++UdjK4V8ZR3enjneKlj0nB2GTYbtIRSxnJI7mxSM5MQWKXzdcDPps5Pe29l+PgX0irz7Semihmb6poFxnZXDA55JInesN7Fay5z8TOJXxbdbTbZo7TR0NRPRawixTTML7HJzdtRfUXdtm123ed3ZnWIaurlr6qSeeSSaaY3kkkkJyKQnfV3d36u7v9q7vNf96WJf5rVf1iXQL5Nab6R4piuKznEZ3SBr3hoJNmi5Fmt2N7AEle5zjcoiIqcsS/Skq5aCqjngkkhmhNpI5IycSjJn1Z2durOz/asxZNcT+I/wBY7NZbi9Pdaasq4qR5pmcakBPbGPlt0LR9CdyFyLrqXXVsMrv8qP3pYa/mtL/WFXPQfSTFMJxWHg6d0Ye9gcAcnDWG0bD2hZYnua7Ird1R14l+8L5g41uFwoMsbHa8FWYtI6W5V8LXC7+TM5NKwlrTR74mASiKObY7npI7uJDYpfLOvrNoxRQTukdM2+ra1+u/6LpjlVLEGNjNr3/wu1xrjq95lYmqb1iK8XW/3mt2+EV9yq5Kqpn2gIDvkkdyLQBEW1fows3mZdUiK/AACwVSJJzKL3/D/wAUmYPCxiaS7YAxXdcNVU+nhEcBNJTVmgSAPOp5GKGba0sm3mAWxy3Do/VeARdXsa9uq8XBXLXOadZpsVZTs5e2yreLfOjD+W2LcEUtsxBe4Kso7vaKsvA5ZYQkqGB6aXU4g5EZs5NNI7yCPksJvs3gzcxvLlzl3c7zBBHUTUgA0YSO7C5GYgzvp1dmctdOmummra6qGPYrf8TPLX8U/wDVVitnxQ/uLvn/AI/xES8U9KZOFYTW1NBxHsgke07bODXkEXvsIGWxXHC6qWWlc+Q3Iv4Ba45i554jzN3R19ZyaItP2OlZ44P+V+rau59RZ23u+j66aLyCIvlPiuL12J1Jq8QldLIdrnEk7s9gHMBkOZYnOLjcoiIo1dV6PL/Nm/ZZ1THaq6SOFz3yUsnl08vUddQfozuws25tC06M7LaLIHNGqzawPJcK2mp6app6s6U2g15Z6CJMTM7u7dDZtNX82v26Np0tneCz91tf/NZP6MK/R/8Ap30kxQ4+3CXTuNOWPOoTdoIsRYHZ2WW7Rvdr6t8ll9Rg7xZ6bOF/Yik+PuCs+owd4s9NnC/sRSfH3BfQHRnlw3FY8c5Kd4Vn0RFX1LoiIiIsWcc3oTZw+xF6+AnWU1izjm9CbOH2IvXwE6zU3tm7x4rHN7N24rQbu0v30/gf5iqmKWfdpfvp/A/zFVMUppD+ISdn5QtDB+Rs7fErWHjT/elQfyqP+tMsQrcHNzh/tObtVHWVM9ZR3CCnKCKaEmcXbV3HeDt1YSd36OLvudtfNpr7mXw34jy55tRyP0pbI9S8LpRctgtufWQPrBoI6u/UW1Ztzr56+mT0baQRY1V42yAyU8jtbWZxrCw+8BxhbnNrda61EL9YutkvAIiL8/rURF2+DsA3nH9e9PZ7fUV0gfXcG0ji1Z3bcb6COu19NXbXTRuqzfgbgsgpZoZ8Q3Pwrb1OkoxcY3di6M8r+U4uLdWYRfr0Lpq960T9G+kOkZ1sMpyY+d7uKwdPGP3rc4brEdCyxwvf90LOy+brjm9NnOH23vXx86+kVaDcaPYO4Rz/AMTYpxlgvEt1wvjLEVdNdpaWvdqu0VFRIBkYszC08PNndjKTfKwMRsMTttEfqto9Xw0srjMbAhd8YpJZ4x6rOyjAiy9xUcC2Z/Bteyp8cYZqqS3HO8FJeqX9otdc7lKwbJx8kTMYTNopNkrAzOUY6rEK9EjlZI3XjNx1KnPY5jtV4sURFl7hX4Fsz+Mm9jT4HwzVVduCdoKu9VX7Pa6F2KJj3zl5JGAzAbxR75XB3cYy0SSVkbdeQ2HWjGOe7VYLlcTgZ9NnJ723svx8C+kVT74KOwYw/wAP+YOH8a44xbVYqxBYJ6S6UVut0D0Vvo62JnN98jk8tSAS8so3ZoNeV5YEJuDUEXnmkNfDVTNMBuAFccHpJYIyJRYkrSLNf96WJf5rVf1iXQLZ3M/hIt2MK+vudsrqigudbKVQUcz8ymM3Z3dvNuHcfV31LTV9B8zNgXMDKa/ZZ1ThdaGSOFz2R1Ufl08vUtNDbozuwu+19C06uzL5gekL0baQYJWTVlZATC57iHt4zbFxIuRm3/0AuJoXtNyMl5xEReWrAi7/ACo/elhr+a0v9YV+mX+U1+zMqmC1UMkkLHskqpPIp4uo66m/R3ZiZ9ralp1ZnWdsruEajwdeaO6XW4yXCsozjnihhDlQxSj16vq5GzFtdvq/V6s7PovUfR96N9IcarYKyjpyIWvaTI7itsDc2Jzds/lDlnihe4ggZLMa+WdfUwo/8Tvd4saYIpKi55W4kpcbwc+Qhs1xALdcIonkBogCYj5E5iBG8hE9O30eoi7kwN9SNGa6Cnc9szra1rdl+fm7Vixyllma10Yva9/opzou1xrga95a4mqbLiKz3WwXmi2+EUFypJKWpg3AJjvjkZiHUCEm1bqxM/mddUr8CCLhVI3GRREXv+H/AIW8weKfE0lpwBhS64lqoNPCJIAaOmo9QkMedUSOMMO5opNvMMd7jtHV+i6ve1jdZ5sAuWtc46rRcrM/Yrf8TPLX8U/9VWK2fFD+4u+f+P8AERLTDs1OxTvfCbnnbcx8cYutdbebB4VHbrXYgkkpj51O8HNmnmACfQJZ25QxN1aMuY7bgffrGeEaPHmGKu017SPS1gMJ8stpC7OxCTP/ABYmZ+urdOrO3ReNekyHhnDquioXAukhfGCchrOa4C56Mxcq5YVSyRUzmSCxJPgFouizdmLwaV1t3T4aqv0jF0/ZKohjnb6rdD6AXVyd9dmjMzeU6wzdLTVWOvOlraaoo6mLTfDPG8cgasztqL6O2rOz/wCa+XWlOhGN6OzepxaAsB2O2sd/1cMj02vcc4Cxvjcw8YLjoi/SkpJa+qjggjkmmmNo444xcikJ30ZmZuru7/Yqs1pcdVouSsa/NbO8Fn7ra/8Amsn9GFY8y/4Qb9imlaous8dhhMN0YSR86oLVhdtQZ2YW0d/OW5nHRx+1bBZbZbW7KvDn6MtnhBRFKU8kk57pJDfRtX0Zm8zC3Rm838dXf9U+gb0c6QUGMtxuvgMUOo4DWycS7ZZv3h08YDLZdb9LC8O1iMl6BRg7xZ6bOF/Yik+PuCs+owd4s9NnC/sRSfH3BfuXRnlw3FYcc5Kd4Vn0RFX1LoiIiIsWcc3oTZw+xF6+AnWU1izjm9CbOH2IvXwE6zU3tm7x4rHN7N24rQbu0v30/gf5iqmKWfdpfvp/A/zFVMUppD+ISdn5QtDB+Rs7fEoiIoVSa8Rjnh4wrj6aaept/glbP1Kqoy5Ujvu3OTt1Aid3fUiF3fXz9G08vgrg4w/Y+YV4qKi+SFqwj5VNEDdNH0EnJybR+u7TQvq6tqsvoqTW+jfResrRiFTQxukF89XI353NHFeetwJWMwsJuQuPa7TS2OgCloqano6aLXZDBG0cYau7voLaM2ru7/5rkIiuccbY2BjBYDIAbAOgLIiIi7ouJfbFRYoslZbLnR0txt1xgOlq6SqiGaCqiMXE4zAmcSAhd2cXZ2dndnWnXFt2HWUfERzbjheH+y/EZ6fT2alErZNpyh+kodRBtI4yZuQUOpykZ8x+i2S4gOKTL7hYwzHdsf4rteGqWfXweOcnkqazQ4wLk08bFNNteWPdywLYxbi0bqp48RfeN/8AdYMpMDf3JKmuxcP/AHGOIKamm/7RNK8/98eX5jUxhdPiDna9HcdfN9cj9VHV81IBq1Fj1c/6hZy4YuwhydyTpKeqxeFVmbiCGeOoaouO6kt8RRyGYsFHGbiQELxjIFQcwny+jCJED7n2KxUWF7JR2y2UdLbrdboApaSkpYhhgpYgFhCMAFmEQEWZmFmZmZmZlpNw0dvdlHnPcLfasXUt1y2vNbqBS15DVWgZXmaOONqsNCHUCYyOWGKMGE9x6CzluzYr7RYoslHc7ZWUtxt1xgCqpKullGaCqiMWIJAMXcSAhdnYmd2dnZ2WHEvtuv8Axl79ezs5u5ZKL7Lq/wANa3Vt7efvXLREUat1F+dXSRV9LJBPHHNDMDxyRyCxDILto7Oz9HZ2+xfovA8QHFJl9wsYZju2P8V2vDVLPr4PHOTyVNZocYFyaeNimm2vLHu5YFsYtxaN1XIiMv8AtgXvzbb9i6uc1o1nGwXXZi8KeHMabpqAf0DWvp5VLGzwF9VusXRvMz6bHHqTu+q/PAfCVhrC0YSXJpL7WCYnvm1jhFxJ3bSNn0dnbRnY3Jn0+xndloNxF943/wB1gykwN/ckqa7Fw/8AcY4gpqab/tE0rz/3x5fmNZo4aO3uyjznuFvtWLqW65bXmt1Apa8hqrQMrzNHHG1WGhDqBMZHLDFGDCe49BZyrM3oVwIVnC78NYZD1XG8x31Nbn1tXWvndRja2hdJYEX+n6LeCkpIqCljggjjhhhBo444xYRjFm0ZmZujMzfYv0XEsV9osUWSjudsrKW4264wBVUlXSyjNBVRGLEEgGLuJAQuzsTO7Ozs7LlqyBoaNUCwCldyIiLlF4HiA4W8vuKfDMdpx/hS14lpYNfB5JweOpo9TjMuTURuM0O54o93LMd7DtLVuin3xUd3Yiu97K5ZO4qpbXBUzuUlkxLJIUFIJFKTvDVRAcjgLPCAxyRkWjERTE+jPRjOLO/CPD7gmfEWNcQ2vDVmg3N4RXTtHzjaM5OVEP1pZXCM3GONiMtr7Rd1pLnJ3h3LDBGYNvtmEsN3/G9j54jc7yJ/o4IonaN3OlhlDmTmLFKzjK1O26NmYnEt7TeFPxIH+DuR/wDP1yv9VGV7aI8otf6/TNcXho7vRl9gq32+vzOvl1xreR1kqrbQTPb7R5ULC8TkOlTJslcyGUZId7MGsbMxCW/OCsDWTLXDNNZcO2e12CzUW7wegttJHS00G4yMtkcbMI6mRE+jdXJ387rEXDF2j+TvFzV09vwhi+lfEE8Ecr2O4xlQ3ASKM5CiAJGYZzjGOTmPTlKI7dXLa4u+clqYhUVcj9WrJv0HL6LYpIadjb04FukfqiIij1tounxjgGzY/oGp7xb6eujD6jmztJFq7O+020Iddra6O2umj9F3CLXq6OCrhdT1TA9jsi1wBBHQQcihAIsVhi48FljqsRtPBc7hS2wtznSCIlIzvu0YJX8wtqPQhJ+j+V11bI+CsrcP5d8x7Pa6ejkl1YpdSkldn01HeTuW3yWfbrpq2umq9Aiq2C+j7RzCKh1Vh1GxkjjfWtcj/qTfUHU2w6ljbExpuAiIiuKyIowd4s9NnC/sRSfH3BWfUYO8Wemzhf2IpPj7grBozy4biojHOSneFZ9ERV9S6IiIiLFnHN6E2cPsRevgJ1lNYs45vQmzh9iL18BOs1N7Zu8eKxzezduK0G7tL99P4H+Yqpiln3aX76fwP8xVTFKaQ/iEnZ+ULQwfkbO3xKIiKFUmiIiIiIiIijrxL94XzBxrcLhQZY2O14KsxaR0tyr4WuF38mZyaVhLWmj3xMAlEUc2x3PSR3cSGxS+WdWnRiigndI6Zt9W1r9d/wBFA45VSxBjYza9/wDC7XGuOr3mViapvWIrxdb/AHmt2+EV9yq5Kqpn2gIDvkkdyLQBEW1fows3mZdUiK/AACwVSJJzKLL3Cvx05n8G17GowPiaqpLcc7T1dlqv2i11zuUTnvgLyRMxhAHlj2SsDOwyDqsQoukkTJG6kguOtdmPcx2sw2KuR2Y/a2/6euNrhg67YN/VzEdnsYXWSro63wiir9kkUNQ7AQicH0k0bgG6XyXNnPUGc90FGDu6fps4o9iKv4+3qz68zx2lip6sxwiwsFd8Knkmpw+Q3KjrxL94XzBxrcLhQZY2O14KsxaR0tyr4WuF38mZyaVhLWmj3xMAlEUc2x3PSR3cSHQbGuOr3mViapvWIrxdb/ea3b4RX3KrkqqmfaAgO+SR3ItAERbV+jCzeZl1SL0SloYKYWhbbx71Tp6qWY3lddERFuLWWXuFfjpzP4Nr2NRgfE1VSW452nq7LVftFrrnconPfAXkiZjCAPLHslYGdhkHVVq7Mftbf9PXG1wwddsG/q5iOz2MLrJV0db4RRV+ySKGodgIROD6SaNwDdL5LmznqDOcN1vz3dP02cUexFX8fb1X8doKd9M+ct4wG397e1S+FVczZmxB3FJ2KxWOsa2zLXBN4xFeqnwKzWChnuVfUcs5ORTwxlJIe0Gci0ASfQWd306M7qWfEv3i253u33C2ZT4N/QvN0jp79f5AnqYwKF2Iho49YglCUmcCOWYHaPyo337RodxzehNnD7EXr4CdfN0oPRvDaeoa6SZtyDl0KVxqtmhLWRG116rOLO/F3EFjafEWNcQ3XEt5n3N4RXTvJyQeQ5OVEP1YomOQ3GONhAdz7RZl5VEV6a0NGq0WCqhJJuUW5/CT24ubnDvyrdiib+1DDga/QXmqIbnDrzS+jrtCN9ZJBd+eM2gRCActuq0wRYamlhqG6kzbj99yyw1EkLtaM2K+ibgj7QbAfHvZL/VYNhv9DPhmeGKuorvSBDOAzCTxSs8ZyRkBPHKLMx7meItRZnFyzkpZ92l++n8D/MVUxeYYtSsp6t8MewW+oBV5w+d01O2R+038UREUct1ERERERERFGDvFnps4X9iKT4+4Kz6jB3iz02cL+xFJ8fcFYNGeXDcVEY5yU7wrPoiKvqXRERERYs45vQmzh9iL18BOsprFnHN6E2cPsRevgJ1mpvbN3jxWOb2btxWg3dpfvp/A/wAxVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviUREUKpNERERERERF8s6+phR/wCJ3u8WNMEUlRc8rcSUuN4OfIQ2a4gFuuEUTyA0QBMR8icxAjeQienb6PURdyYGtOjNdBTue2Z1ta1uy/PzdqgccpZZmtdGL2vf6Kc6Ltca4GveWuJqmy4is91sF5otvhFBcqSSlqYNwCY745GYh1AhJtW6sTP5nXVK/Agi4VSNxkURFl7hX4Fsz+Mm9jT4HwzVVduCdoKu9VX7Pa6F2KJj3zl5JGAzAbxR75XB3cYy0XSSVkbdeQ2HWuzGOe7VYLlbN93T9NnFHsRV/H29WfWl/Zj9kl/oE42uGMbtjL9Y8R3ixhapKOjovB6Kg3yRTVDMZERz/SQxsB7YvJY3cNTZg3QXmeO1UVRVmSE3FgrvhUEkNOGSCxXyzoqMcTvd4saYIpKi55W4kpcbwc+Qhs1xALdcIonkBogCYj5E5iBG8hE9O30eoi7kwNPzGuBr3lriapsuIrPdbBeaLb4RQXKkkpamDcAmO+ORmIdQISbVurEz+Z16JSV9PUi8Lr+PcqdUUk0BtK2y6pERbi1kW/Pd0/TZxR7EVfx9vWsnCvwLZn8ZN7GnwPhmqq7cE7QVd6qv2e10LsUTHvnLySMBmA3ij3yuDu4xloq1dmP2SX+gTja4Yxu2Mv1jxHeLGFqko6Oi8HoqDfJFNUMxkRHP9JDGwHti8ljdw1NmCv47X07KZ8BdxiNn72dql8KpJnTNlDeKDtWfeOb0Js4fYi9fATr5ul9N2eeWn9tGSeMcHeG/o39bLHW2bwzk87wXwiA4eZs3Dv279du5tdNNW86hbxUdkXnVwn2Qrxc7HS4pw/BA89XdcNSSV0FAzDKZ84CjCaMACJzKV4+ULELPJufa0VotVQsa+N7gCSLKQx6CR5a9ouAFrGiIrqqwiIvf8P8Awt5g8U+JpLTgDCl1xLVQaeESQA0dNR6hIY86okcYYdzRSbeYY73HaOr9F0e9rG6zzYBdmtc46rRcqhvdpfvp/A/zFVMWnXZG9nHijgBsmOjxbfLBdLji6eiGOC0PNJBTRUwz6G8soRk5mVQbOOzQWjF9xb3YdxV5fjU8c1a+SI3Bt4BXvDInx0zWPFjn4lERFFLfRERERERERRg7xZ6bOF/Yik+PuCs+owd4s9NnC/sRSfH3BWDRnlw3FRGOclO8Kz6Iir6l0REREWLOOb0Js4fYi9fATrKaxZxzehNnD7EXr4CdZqb2zd48Vjm9m7cVoN3aX76fwP8AMVUxSz7tL99P4H+YqpilNIfxCTs/KFoYPyNnb4lERFCqTREREREREREREXgeIDhby+4p8Mx2nH+FLXiWlg18HknB46mj1OMy5NRG4zQ7nij3csx3sO0tW6KffFR3diK73srlk7iqltcFTO5SWTEskhQUgkUpO8NVEByOAs8IDHJGRaMRFMT6M9QkW/SYnU03snZdHN3LUqKGCf2jc+nnWkvDF2EOTuSdJT1WLwqszcQQzx1DVFx3UlviKOQzFgo4zcSAheMZAqDmE+X0YRIgfc+xWKiwvZKO2WyjpbdbrdAFLSUlLEMMFLEAsIRgAswiAizMwszMzMzMuWiw1NZPUO1pnE/vo2BZYaeKEWjbZERFrLMi8DxAcLeX3FPhmO04/wAKWvEtLBr4PJODx1NHqcZlyaiNxmh3PFHu5ZjvYdpat0Xvl4DMviQw5lzzYOf+lLnHqPglK7FsJtzaSH9UNCHR26k2rPtdReL6RUGCwfbcQnELRzk2z6ucnqFyscmpq2k2dan5xUd3Yiu97K5ZO4qpbXBUzuUlkxLJIUFIJFKTvDVRAcjgLPCAxyRkWjERTE+jPmjhi7CHJ3JOkp6rF4VWZuIIZ46hqi47qS3xFHIZiwUcZuJAQvGMgVBzCfL6MIkQP63MXisxHjTdDQF+gaJ9PJpZHecvqv1l0Z/Oz6bGHoTs+q5eX/F9fsLUrU91gjv0IBtjOSTk1A6MLNqbM7E2jP5x3O5auX2Ly7/9TYDJWGgfJIIR/wAupkTuH+5br1bk3uOdRLIKJsmsGfp3LZexWKiwvZKO2WyjpbdbrdAFLSUlLEMMFLEAsIRgAswiAizMwszMzMzMuWvIZdZ54czN2x0FZya0tf2OqZo5/wDmfo2rsfQXd9jvo2mui9evVMLxiixOnFZh8rZYz/M0gjdlsI5wcxzqYaQRduxERFIrstY+Kjsi8leLC9leLnY6rC2IJ53nq7rhqSOhnr3cpTPnAUZwyGZyuZSvHzScRZ5NrbXnjnJ3fnOLBmYNvt+EK2wY1w/cZxie7lONsO2DpGxS1VPIREwMRyaNTlOTjE7uIkQg9qkUvR43V041WuuOg5+aj6jC6ebNwsekZKePDR3ejL7BVvt9fmdfLrjW8jrJVW2gme32jyoWF4nIdKmTZK5kMoyQ72YNY2ZiEt+cFYGsmWuGaay4ds9rsFmot3g9BbaSOlpoNxkZbI42YR1MiJ9G6uTv53XaotOqr6ipN5nE+HctiCkhgFom2RERai2EREREREREREREUYO8Wemzhf2IpPj7grPqMHeLPTZwv7EUnx9wVg0Z5cNxURjnJTvCs+iIq+pdERERFizjm9CbOH2IvXwE6ymsWcc3oTZw+xF6+AnWam9s3ePFY5vZu3FaDd2l++n8D/MVUxSz7tL99P4H+YqpilNIfxCTs/KFoYPyNnb4lERFCqTREREREREREREREREREREREREWp2eGduJbzi2+2d7lJT2unrZqYaenZomIAco9CJvKJibVyZ3cXd/N0Zmxou/zX/eliX+a1X9Yl0C+W2mGK1tfi9RJWyukIe8DWJNhrHIX2AcwGQUHI4lxuiIirCxos1cNmduJbvmJbLFX3KS4W+pCYXapZjlF2A5GJpPru+o6eU7to7tp0bTCq9/wvfv0sf8A5Hw8qv3oyxWto9JqFlJK5gkmia8NJAc0yNBa4DaM9hWaFxDxZbeoiL6ZKaRERERERERERERERERERERERERRg7xZ6bOF/Yik+PuCs+owd4s9NnC/sRSfH3BWDRnlw3FRGOclO8Kz6Iir6l0REREWLOOb0Js4fYi9fATrKaxZxzehNnD7EXr4CdZqb2zd48Vjm9m7cVoN3aX76fwP8xVTFLPu0v30/gf5iqmKU0h/EJOz8oWhg/I2dviUREUKpNERERERERERERERERERERERERaRZr/vSxL/ADWq/rEugW3OYnDNhrH8lXVNDJbLpVG8pVVOT6Ee121KN32uzvoRaMJO7fW6u74FzL4b8R5c82o5H6UtkepeF0ouWwW3PrIH1g0EdXfqLas25189fSF6IdI8IqZsQMXrYXOc7Wju6wJJ4wsHDLabFo/qURNTvab8y8AiIvGVrIvf8L379LH/AOR8PKuwy64U8R402zV4/oGifXyqqN3nL6zdIuj+dm13uPQmdtVnbLbh9w5lfX+GUUNRVV7bmCpq5GOSISZmdhZmYW8z9dN3lE2uj6L3z0XeiLSSpxSjxmaH1MEUkcl5OKXBrg7it+9nbIkBpvcErbgp3lwdzL26Ii/eilUREREREREREREREREREREREREUYO8Wemzhf2IpPj7grPqMHeLPTZwv7EUnx9wVg0Z5cNxURjnJTvCs+iIq+pdERERFizjm9CbOH2IvXwE6ymsWcc3oTZw+xF6+AnWam9s3ePFY5vZu3FaDd2l++n8D/MVUxSz7tL99P4H+YqpilNIfxCTs/KFoYPyNnb4lERFCqTRERERERERERERETVERF0uCMx8PZmUFTVYcv1mxBS0dSdHUTW2tiq44Jw03xGUZOwmOrai/VtW6LulyQRkUBB2IiIuEREREXjMeZA4XzBjN6m3R0lUZlI9XRM0MzkRMROTs2hu+nnNi876aO+q5eBsnMOZdww/o62U/hMPVquYWkqXJx2k+9+o6trqw6D1fRm1XqEVeZolgjK7hNlJGJ/69Rutlz3tt69uwXyC6erbfWtmiL8Ljc6ez0UlTVzw0tPE2pyzGwADebq79GX6QThVQBJGYyRyCxAYvqJM/VnZ/tZTwkYXmMEawANuexvY26DY23Fd1/aIi7oiIiIiLpblmPh6z4zt+HKu/WalxDdozmobXNWxBW1gAzuZxQuW8xFmfVxZ2bR9V3S5sbXS4vZEXmpc5cIQZjR4PPFeGwxbKHNCyFc4WuJhtc9zU+7mO21nLXb5md/MvSoWkWJG1cBwOQRERcLlEXS4czHw9jC+3a12m/Wa6XOwSDDc6SjrYp57cZa7QmAScoyfR9GJmd9H/AILulyQRtS4OxERFwiKMHeLPTZwv7EUnx9wVn1GDvFnps4X9iKT4+4KwaM8uG4qIxzkp3hWfREVfUuiIiIixZxzehNnD7EXr4CdZTWLOOb0Js4fYi9fATrNTe2bvHisc3s3bitBu7S/fT+B/mKqYpZ92l++n8D/MVUxSmkP4hJ2flC0MH5Gzt8Ssd8S2MK/C2BqeK3TnSVN1rAo+eD6FEL6u7s/2P08//VeZzSyNtWW+XU98sstfRXu1MEz1o1RudQ+5mLczvp11fzMyyHmzlvFmjhE7cU70s4SDPTzs2vKkHzO7fa2ju3+a8nectcdY/s8Vmv8AdrDBaGIfCJaCOV6mqEerMW5mFtdGfp9v2P5l+dtM9HKusra8upHTSSxsbSyC1oXBpBOsSDEQ+zy4feGVzbVW5KONdwuLbOu58cs+ZcqwZw3G6Y4wrayhpPBr3aWrpzcC5gybSfyX3aM2rfwdcCvz2u9LZ8c1A09u34ZqhgpWeM9JBc9vl+X1fT+Gi7PGuUl0DFVivOF57ZT1FmpXomgr2N4ii0dm6h11bV/4fZ1XSx5A339VMY0c9wt1VWYklimjmfdGO5i3HuFhfb11001+xYMWfpk37RTQCQub9pLXjV1TeEeoDc73D72FsjkdoXRokaQ09X5c/wD6Xt8r77iHE1q/SF7pbZRU9YAS0cNORlMAu2r8x36a+Z20/j1U8O0Uwxb8KcdFwxRxBYOxvjbIyrtlPTYfqbNVTjQ4eqHGMZCmCKSPabycx+ps5MTaDJptGlWHLcdow9Q0kji8lLTxwm4/VdxFmfT/AA6LXniEy94mr5inE1BgXEuUFZgnEkXKhixPb6sa+zAcTRyRx8gSimZ33GzzM/Utrtoy940dbJRBjXPL3Bp4zzYknbmBxXZ5EAAAW6j1kj16cMkvna9s7c+Y5xlYjr7RjrM7juwtwkcLeU1qynvNtxiOO5pKDDV4xbeSioLfTRn9JNWznsNggeQIuWWwxYXZ31DaX8ZB9ptiXFV8zMwfiebKu+4twfhSpxVabxgi5S3Cw3IIo9XhLcbmxiThubezuzl0HRnfqsZ9jQVDwx5Z4ZwziKxXLF2WVxqbpFLiO1DUWe9lUmJzwTwaG4xO4Rs313ZhLpqW4fZ5KcDeOrLZMeTYisvD9hS44iwtW4et9FgHC/gELSTi2k89WcfhG3VmZ4xZw8xaO4sp+Y0JilLXaziX5naf6SP85Zm97DZqwfag+EObqt4twNgz41+ji9g5rnbjC09oXxM4l4LLhnlTYOynocL0NA0kVJMFwnr64wqQhnqRAZRAKfTmuwkbm3L11IX1fM2KuPa7Yp4hMiMGYAorLcKTM+0PiW9VFbDLIVBbOXvF4tkgsMjuEo6mxMzsLadV7ThW4T6nK7gRs+UOMpLZcZo7RV2m5HQGclNKE8kzvsIwAn8mVvOLdW/zWGezK7NLGnCLmVecSZg4hsOI6mms0eHcN/o+eaV6Ci5xzSCXMij26ls0Yd3nPr5lxM+hc+awFmF2r/cCHADr42q7myJ5sliYyr9RFcnWcAHf2m7TfsbrDfbnWKuFzjht3CzwB4xxbYMvsO0N4uWY1RYLVZbVNVhS19ZJHFpLI880xjoAlqIEIeQIiwa6rYus4pM3+F3IjHmNc98NYDkpsO2+nrLUeD6ycY62eU3iailGocjA2keLWQWcGE303bXWJbD2Q2Ka3gpv2X11xPYrbi0ccS4zsFxoCmqKSGTlgEcczHHGTasxs7iJbdRJt2ji+Vb7wrZycVGROOsG534qwFTU+IbdBSWuHCFBOUVHUxStM1XKdTtkMnMI2eMdBcWLRxd9Uqn0rwXAgm41r3vq6rPu9d9b6X4qzwtmbIA4G3Gta20vdfW6tXVPfbjLEuUvaxYzp80cu6fHVVkZdcO5lVsNvipMGYgOsvWGZZ9vK8OB5DB2ZyYS2MzM+vXVtr7v5qYFjzGwNXWstGlkDfTm/wD9co9Rf/8Aej/4O6084eOztzKwJjLCEWI7FwwUVmwlV01QV7sWCWkxFdhgJnFjOWIYoZD2s7yx+WJdR69VvKobSrDcNxGkfQOaDHIHNdb+k5DcRnY7dhXfDzUXPr+gd+d+zZsy6Oe2AsEXK4Z84isNoukMsdNhIXlue7/76gCcAZ/8mbX/AKkvV1GbOKcU3O+Fhe32UrZh6QoZTrik5tUYs7k0bA7M3m+3+LdfsXfZY5dVuC8VYorqqWlkivdZ4RA0RE5AOpdC1FmZ+reZ3XQT5S4qwtdL6GGbjZQtmIZSmlGtCTnUhnqxPHtZ2fz9Nf8ADp9q/PdNg+kdHhcMzjK6aUyGdzNUSl7W6kH3tjAGi4GV8zkXLOyMs3Xt16ova3j05lA4gKm7U2CaiipaYIsSVJU9WErEZQuLiL7HZ2+1387P9nRc645uXKjzAxTahhonp7Ha3roCcC3mexi0J92jt1+xmf8AxXAvHD5VW7CGGaexVtK1zw1UPUgdWJNDUETs57turt1bp/h/+r/bXk3iI8R4hulzr7VUVN+tRUjtCxxhDK7aMzNtfyGZm6u7k/8ABbU0mmjX/Z5GvL7hxc3V1LfYtUtGd+VXIFrbDexF0freLr/2+Of0X84ZqMS8QGXNUN0itFptN2peXEcIySVDyCTfSbXJh2O7Po2uv+Lr+8eZn3PL/E1nwta/0HTO1CJ+GXczjgl2+SwC4v0Lyftd/PovZZV4UqMD5fWy01ZwyVFFE4GULu4O+536O7M/2/wXn85cvcQY+Y6WhfDk9tqIdhDcYDeakPrrJCQs/lOz/b5tP8XUtjOD4tS4EysoXSurnNiEhFi94brv1DsDBrvcNZrSRcAgtGXLGu9UHO+9buva4+n+V7W2T1NZZYJJ4wpqySFiMGLmDGbt1bVvOzOpG5XYdy/ytzwuNq4qbfmThXN+uv51dnzGa61QURgxjynglAuWAMT9CeMwES8oo9NrVlwzhiXDOBqS0xVhFPSUjU4VJDudiYdGPa/8H+z/ACWnGeHBfxJ8W2CKfLnMnGuUT4EGtinq73abXVtf64YS3ATwmzU0Zl9vLdmb/wDptRf27R+pdFnMdUkNDs+MOnVcBa45xazsrDo162IyU7Q4XOZtYEXtscMr3vt5rXyyv6rjf4wc1Mh8VXJsNSZFYfsNst411LLjfErw1+J/o3MwoqeOQHF2JnjbmPoRN0fR+mBeLTjRzczt4f8Ahyx/gWstmC6PGuJKejqKQLlWxSz3MZpomhnKFxaS3Fy3cgfU+ot101Xt+IDsqcb4o4isWYkwrPlPfbDjOz0tncsdWya41+GBigCDmUAsJRPIzAxiROOjvpp01fsbz2Y+PpOAPKjAFuxBhOlzCyrxCOIaWeU55LRVSDUTyMBHymlZtsovry/OLj5n3NJ0rqGKOJ5ILg5l8jex1ta4z2ZdV9mS1qgVcjnsAsC13PlezdW3Rc3Hiv8AMRYpvlv7TbIa3Zh4Sy9uGYE2FbjPV3qxvcf2Mhat2xUjSTiBA4MzPzojJikk2u2raczgu7QrNLi/zKr/AAS3ZS0NgGqraP8AQJ3SojxTY+VGfJqKqE3YZYXlYIyeIWJnk8zbXXr34Rc08d8ZOUubWLLjgKGswhh2stl9hs51bAVTM1UwFSxyg7lGzSx6vJIL6sXTzMvJ5f8AZ+Zq4l4ysG5mZi3PKmmfA51Ej3PCNuqKK84rI4+UBXDVhi12s2ux3bRzBm2lq3QOpnNDJSPuOHPYHXkPFHWLdFrg58ZdnCdrnPiB2s27SAxozO+/SMrHmWI+zUwZmHc+LbPjGV5wrlVii/4dxBXjXziEzXQLowTjHT2upnZ2gpTfcBPI7FscddWbRe/w/wBpxmVhDiPwDhnGX9hV8tOPbsNoO34LxDJX3jDksjiIeFu5uD6Oba7Q2ltLQm6a5Lym4CcS4as3Erbbrf7bQRZ2Xauq7VWWuWWSe2xVAzCLyiQRtvbmNqIE7Po7bvtWBsquyJzTwrjDKOpuA5E2yiyvv1NWy1VgoKqC7YgpwkYzkq6k4dZJm2MwB5IeWWpNtFZ2T0k04NQRqhsY5/6eNbPKxy2X2ZgA3xSxVEUTvUg6xdIb/wDri77jPo23vcWy5UcamdufWfOYliyTwnl5W4cyrrmtlynxLV1MdVe6pt2+GleJxjjLWOQWeXUfqk5NrtWP8Z5m8R0/a0VGGsOXjBNPCeExuFLY7rcLkVmjoHn0eSWKJ9r3Bn3DvEdm1m6r3dNwT54cPee+Y95yYxdl3T4YzTr/ANK18eJqWqlrbJVE5uZ0wxM8cr6yE7c12b6ouPk7n77OrhCzZg4zsMZwZcYgwLU3GDDQYZvsGKIakI542lcynhGmZ/KLV32uQsLi3UmJ2bBTSUzHxlurYtIzvfWLM9bmtr5bjlks1UyZ7JAb3Dr5bNUPFrc99T6g35liPK/i4w5ww484xMby4KsdFLhK/wBLCRWyWqCoxDUSTVEcXPeaaWMHeQtXKGMG8sycSfRl6qn49M9MkMTZX3PODCGXUGBs1rhBbqUsOz1X6SsUtQzFC1VzjeM3Zi1Ll9NAPqz6C/NLstLrjoeJa3YnvVmprXnRdae5WSooHlqJ7YcMsssZzxmEY6sRBqIG+rbm3N0dcaz8BueGduJMsLfnTi3LyowTlTWQXGkgw3BVPX36eAWGEqsphEA0Yerxto7GbbdXYh7xPonFplINhGDe/wB0RgOA/uDrjqytlddZxUgv9UDmZCLW+8XcUnqt/m/MutuPH3xAY8zNzysOAMIZY1NFk9XTkVwvE1VG81NG0jjBygk1kqDaI3Y90cbbXZ2Z3ZbQ8G3EO3FbwzYSx89C1smxBSEdRSibmMM0chxSMLv1cd4E7a9dHbVYoyP4IsV5aY+4k7rXXDD0tPnHUSS2UYJ5iOlYgqRbwhniZhfWYfqOfmf/AA1yFwB8Pd64VuEvCWA8Q1NsrLvYQqBqJrdIclMbyVMsrbCMAJ/JNtdRbrr/ANVo1DqY0+qwDWAiz5ySw699zrfslbDBOKjWJOqXSZcwAcNTvF/3ZZjUYO8Wemzhf2IpPj7grPqMHeLPTZwv7EUnx9wW1ozy4bisOOclO8Kz6Iir6l0REREWLOOb0Js4fYi9fATrKa6rHWCrZmVgm8YdvVN4bZr/AEM9tr6fmHHz6eaMo5A3A7EOoETai7O2vR2dZInhkjXHmK6SNLmloUyO7S/fT+B/mKqYobcAHEBUdk9x34owxmTHdYLNLzMOXzwMpmp6cxmA6e5tAQCVREwMTgW1j5NWZgxO/LO31ivtFiiyUdztlZS3G3XGAKqkq6WUZoKqIxYgkAxdxICF2diZ3Z2dnZTekcLhVmf+V4BB7AFF4NIDT+q/mbe47Vy0RFAKXRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERRg7xZ6bOF/Yik+PuCsBmlmlh/JPL664qxVdaWyYfskD1FbW1DvsiHVmZmZmciMicREBZyMiERZydmeKsd2qO2C7WKgrKe03U8G1ldTST0FyqpjG32KiEOeJnDr4Nz9puwg7CNRWsPMdy5j2PRxhZM6qd9xgNz/AIUNjTg6MQD7ziFclERVxTKIiIiIiIi1O7SjsrsP8elIOIaa51VhzEs9qK32urKVyt9WIyPLHDVR7SJgYjmZpItCHnuRNKwDGpu4Ezu4q+yUq2oLnab/AG7ClNONK1sv9KVxw5LLJHNMMdPURlywN3lklIaWcXI435m7YQtdNFM0eMvii9RM0SM6Dzbj++pRtThrZH+tjcWO6QoweMWZ2eq+Vnu2v+cTxizOz1Xys921/wA4rPos/CtD8KPm8li4Pqvfnu81GDxizOz1Xys921/zieMWZ2eq+Vnu2v8AnFZ9E4VofhR83knB9V7893moweMWZ2eq+Vnu2v8AnE8Yszs9V8rPdtf84rPonCtD8KPm8k4Pqvfnu81GDxizOz1Xys921/zieMWZ2eq+Vnu2v+cVn0ThWh+FHzeScH1Xvz3eajB4xZnZ6r5We7a/5xPGLM7PVfKz3bX/ADis+icK0Pwo+byTg+q9+e7zUYPGLM7PVfKz3bX/ADieMWZ2eq+Vnu2v+cVn0ThWh+FHzeScH1Xvz3eajB4xZnZ6r5We7a/5xPGLM7PVfKz3bX/OKz6JwrQ/Cj5vJOD6r357vNRg8Yszs9V8rPdtf84njFmdnqvlZ7tr/nFZ9E4VofhR83knB9V7893moweMWZ2eq+Vnu2v+cTxizOz1Xys921/zis+icK0Pwo+byTg+q9+e7zUYPGLM7PVfKz3bX/OJ4xZnZ6r5We7a/wCcVn0ThWh+FHzeScH1Xvz3eajB4xZnZ6r5We7a/wCcTxizOz1Xys921/zis+icK0Pwo+byTg+q9+e7zUYPGLM7PVfKz3bX/OJ4xZnZ6r5We7a/5xWfROFaH4UfN5JwfVe/Pd5qMHjFmdnqvlZ7tr/nE8Yszs9V8rPdtf8AOKz6JwrQ/Cj5vJOD6r357vNRg8Yszs9V8rPdtf8AOJ4xZnZ6r5We7a/5xWfROFaH4UfN5JwfVe/Pd5qMHjFmdnqvlZ7tr/nE8Yszs9V8rPdtf84rPonCtD8KPm8k4Pqvfnu81GDxizOz1Xys921/zieMWZ2eq+Vnu2v+cVn0ThWh+FHzeScH1Xvz3eajB4xZnZ6r5We7a/5xPGLM7PVfKz3bX/OKz6JwrQ/Cj5vJOD6r357vNRBuGWvFn2tmYNDHiGlv9twzXwPebfLdqKptGFKODQzgOHSNxmNxqOXHIzTTkBtuNwEjGpnAZwGYX4Bsrquw2GrqrzcbzPHWXa7VkEMc9XKMIR7A2CxDTiTSHHEZSODzSeWW53fOSLVrcWkqGCFoDGdAWelw9kLvWOJc7pKIiKJUgiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIv/Z", width:50, height: 50, alignment: 'center'}, {qr: 'To Be Updated', alignment: 'center', bold:false, fit:'50' }],
              [ {text: 'Date:' + elm.activity[0].date + ' '+ elm.activity[0].time}, {text: 'Destination:' + elm.receiverCountry +'\n' + 'Product Type:' + elm.service}],
              [ {text: 'Account Number:'+ elm.accountCode}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'NoOfItems: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit , bold: false }, ''],
              [ { text: 'From:\n' + elm.companyName +'\n'+ 'Mobile:'+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address:'+elm.receiverAddress+'\n'+'City:'+ elm.receiverCity+ '\n'+'Mobile:'+elm.receiverContact+'\n'+'Country:'+elm.receiverCountry}],
              [ { image: this.textToBase64Barcode(elm.altRefNo, 100, 30), bold:false, alignment:'center',rowSpan:2, width:95}, {text: 'Goods Description:' + elm.description}],
              [ '', {text: 'COD:' + elm.codAmount, bold:true }],
            ]
          },
          pageBreak: 'after'
        }
      ];

      this.A6LabelContentsBody.push(ent);
    });
  }

  docDefinition = {
    info: this.Info,
    pageSize: "A6",
    pageMargins: 1,
    content: this.A6LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
  };

  textToBase64Barcode(text: string, ht:number, fSize: number = 20) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
    }

    generatePdf() {
      this.buildA6ContentsBody();
      pdfMake.createPdf(this.docDefinition).download("a6-label");
    }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
