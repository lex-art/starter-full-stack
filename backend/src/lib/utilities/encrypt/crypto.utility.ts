/* import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoUtility {
  private readonly algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
  private readonly key: Buffer; // Clave de cifrado
  private readonly iv: Buffer; // Vector de inicialización

  constructor() {
    const keyHex = process.env.CRYPT_KEY;
    if (!keyHex || keyHex.length !== 64) {
      throw new Error('CRYPT_KEY debe ser de 64 caracteres hexadecimales');
    }
    const ivHex = process.env.CRYPT_KEY_16;
    if (!ivHex || ivHex.length !== 32) {
      throw new Error('CRYPT_KEY_16 debe ser de 32 caracteres hexadecimales');
    }
    this.key = Buffer.from(keyHex, 'hex'); // Convertir de hexadecimal a Buffer
    this.iv = Buffer.from(ivHex, 'hex'); // Convertir de hexadecimal a Buffer
  }

  public encryptData(plaintext: string): string | null {
    if (!plaintext || plaintext.trim() === '') {
      return null;
    }
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(plaintext, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  }

  public decryptData(encrypted: string): string | null {
    if (!encrypted || encrypted.trim() === '') {
      return null;
    }
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  public hashText(text: string): string {
    if (!text) {
      return text;
    }
    const sha512 = crypto.createHash('sha512');
    sha512.update(text);
    return sha512.digest('hex');
  }

  public hashTextSHA1(text: string): string {
    if (!text) {
      return text;
    }
    const hash1 = crypto.createHash('sha1');
    hash1.update(text);
    return hash1.digest('hex');
  }

  public async encryptEntityData(data: Record<string, any>, keysToEncrypt: string[] = []): Promise<Record<string, any>> {
    for (const key of keysToEncrypt) {
      if (Object(data).hasOwnProperty(key) && data[key]) {
        data[key] = this.encryptData(data[key]);
      }
    }
    return data;
  }

  public async decryptEntityData(data: Record<string, any>, keysToDecrypt: string[] = []): Promise<Record<string, any>> {
    for (const key of keysToDecrypt) {
      if (Object(data).hasOwnProperty(key) && data[key]) {
        data[key] = this.decryptData(data[key]);
      }
    }
    return data;
  }
}
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoUtility {
  private readonly logger = new Logger(CryptoUtility.name)
  private  algorithm: string; // Algoritmo de cifrado
  private  key: Buffer; // Clave de cifrado
  private  iv: Buffer; // Vector de inicialización
  

  constructor(private readonly configService: ConfigService) {
    // Inicializar clave y IV (se debe asegurar que estos valores estén configurados correctamente)
    const keyHex =  this.configService.get<string>('CRYPT_KEY')  //process.env.CRYPT_KEY;
    if (!keyHex || keyHex.length !== 64) {
      throw new Error('CRYPT_KEY debe ser de 64 caracteres hexadecimales');
    }
    const ivHex = this.configService.get<string>('CRYPT_KEY_16')  //process.env.CRYPT_KEY_16;
    if (!ivHex || ivHex.length !== 32) {
      throw new Error('CRYPT_KEY_16 debe ser de 32 caracteres hexadecimales');
    }
    const algorithm = this.configService.get<string>('CRYPT_ALGORITHM') //process.env.CRYPT_ALGORITHM;
    if (!algorithm) {
      throw new Error('CRYPT_ALGORITHM no está configurado');
    }
    this.key = Buffer.from(keyHex, 'hex'); // Convertir de hexadecimal a Buffer
    this.iv = Buffer.from(ivHex, 'hex'); // Convertir de hexadecimal a Buffer
    this.algorithm = algorithm 
  }

  public  encryptData(plaintext: string): string | null {
    if (!plaintext || plaintext.trim() === '') {
      return null;
    }
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(plaintext, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    } catch (error) {
      this.logger.error('Error encrypting data:', error);
      return null;
    }
  }

  public  decryptData(encrypted: string): string | null {
    if (!encrypted || encrypted.trim() === '') {
      return null;
    }
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      this.logger.error('Error decrypting data:', error);
      return null;
    }
  }

  public  hashText(text: string): string {
    if (!text) {
      return text;
    }
    const sha512 = crypto.createHash('sha512');
    sha512.update(text);
    return sha512.digest('hex');
  }

  public  hashTextSHA1(text: string): string {
    if (!text) {
      return text;
    }
    const hash1 = crypto.createHash('sha1');
    hash1.update(text);
    return hash1.digest('hex');
  }

  public  async encryptEntityData<T>(data: T, keysToEncrypt: string[] = []): Promise<T> {
    for (const key of keysToEncrypt) {
      if (Object(data).hasOwnProperty(key) && data[key]) {
        data[key] = this.encryptData(data[key]);
      }
    }
    return data;
  }

  public  async decryptEntityData<T>(data: T, keysToDecrypt: string[] = []): Promise<T> {
    for (const key of keysToDecrypt) {
      if (Object(data).hasOwnProperty(key) && data[key]) {
        data[key] = this.decryptData(data[key]);
      }
    }
    return data;
  }
}
